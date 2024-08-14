const express = require("express");
const session = require('express-session');
const morgan = require("morgan");
const routes = require("./routes");
const cors = require("cors");
const { passport, initialize } = require("./passport");
const { JWT_SECRET_KEY } = require("./config/envs");

const app = express();

// Configuración de CORS
app.use(cors());

// Configuración para parsing de JSON y URL-encoded
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configuración de sesión
app.use(session({
  secret: `${JWT_SECRET_KEY}`,
  resave: false,
  saveUninitialized: false
}));

// Logger
app.use(morgan("dev"));

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use("/", routes);

// Configuración de cabeceras y métodos permitidos
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});



// Ruta para manejar errores 404 (Not Found)
app.use("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "Not found",
  });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message,
  });
});

module.exports = app;



