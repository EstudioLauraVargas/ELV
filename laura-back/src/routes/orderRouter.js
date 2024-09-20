const express = require("express");
const router = express.Router();
const {
 createOrderDetail
} = require("../controllers/OrdersDetails");
//const { authenticate, authorize } = require("../controllers/Users/authMiddleware");

// Ruta para crear usuario
router.post("/", createOrderDetail);

// Ruta para actualizar usuario
//router.put("/:document", authenticate, authorize(['admin', 'client']), putUser);

// Ruta para eliminar usuario
//router.delete("/:document", authenticate, authorize(['admin']), deleteUser);

// Ruta para obtener todos los usuarios
//router.get("/", authenticate, authorize(['admin']), getAllUsers);

// Ruta para obtener un usuario por documento
//router.get("/:document", authenticate, authorize(['admin']), getUserByDocument);

module.exports = router;