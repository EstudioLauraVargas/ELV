const express = require("express");
const router = express.Router();
const {
 createOrderDetail, getOrderCompra
} = require("../controllers/OrdersDetails");
//const { authenticate, authorize } = require("../controllers/Users/authMiddleware");

// Ruta para crear usuario
router.post("/", createOrderDetail);
router.get("/:document?", getOrderCompra);







module.exports = router;