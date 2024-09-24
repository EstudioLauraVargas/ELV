const  getOrdersDetails  = require("./getOrdersDetails");
const  createOrderDetail  = require("./createOrderDetail");
const getOrderDetailID =  require("./getOrderCompra");
const confirmOrderPayment = require("./confirmOrderPayment");
const getOrderCompra = require("./getOrderCompra");


module.exports = {
  
  createOrderDetail,
  getOrderDetailID, 
  confirmOrderPayment,
  getOrderCompra
}