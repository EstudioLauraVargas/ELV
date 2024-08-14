

const { conn } = require("./src/data/index")
const app = require('./src/app.js');
const PORT = process.env.PORT || 3000;

conn.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Listening on port: ${PORT} 🚀`);
  });
}).catch(err => {
  console.error("Error syncing database", err);
});
