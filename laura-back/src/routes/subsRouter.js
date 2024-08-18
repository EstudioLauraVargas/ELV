const express = require("express");
const router = express.Router();
const {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionById,
  getSubscriptions,
  
} = require("../controllers");


// Ruta para crear usuario
router.post("/", createSubscription);

// Ruta para actualizar usuario
router.put("/:idSub",updateSubscription);

// Ruta para eliminar usuario
router.delete("/:idSub", deleteSubscription);

// Ruta para obtener todos los usuarios
router.get("/:idSub", getSubscriptionById);

// Ruta para obtener un usuario por idSub
router.get("/", getSubscriptions,
);

module.exports = router;