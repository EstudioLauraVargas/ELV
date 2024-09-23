const express = require("express");
const router = express.Router();
const webhook = require("../controllers/webhook");

// Define el webhook como middleware para la ruta POST
router.post('/', webhook);


module.exports = router;
