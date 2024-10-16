const express = require("express");
const session = require('express-session');
const morgan = require("morgan");
const routes = require("./routes");
const cors = require("cors");
const { passport } = require("./passport");
const { JWT_SECRET_KEY } = require("./config/envs");
const path = require('path');



const app = express();

app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

app.use(cors());

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));


app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: `${JWT_SECRET_KEY}`,
  resave: false,
  saveUninitialized: false,
}));

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(passport.initialize());

// Rutas de API
app.use('/', routes);

// Servir la aplicación React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  // Manejo de rutas para React Router
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).send({
    error: true,
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
  });
});

module.exports = app;


