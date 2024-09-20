const  getOrdersDetails  = require("./getOrdersDetails");
const  createOrderDetail  = require("./createOrderDetail");
const getOrderDetailID =  require("./getOrderCompra");
const confirmOrderPayment = require("./confirmOrderPayment");

module.exports = {
  
  createOrderDetail,
  getOrderDetailID, 
  confirmOrderPayment
}