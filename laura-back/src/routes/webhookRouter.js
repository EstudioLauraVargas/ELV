const express = require("express");
const router = express.Router();
const webhook = require("../controllers/webhook");

// Define el webhook como middleware para la ruta POST
router.post('/', async (req, res) => {
  try {
    // Llama al controlador webhook para procesar el evento
    await webhook(req, res);
  } catch (error) {
    // Si ocurre un error, devuelve un estado 500 con un mensaje adecuado
    console.error('Error in webhook route:', error);
    res.status(500).json({ error: 'Error processing webhook' });
  }
});

module.exports = router;
