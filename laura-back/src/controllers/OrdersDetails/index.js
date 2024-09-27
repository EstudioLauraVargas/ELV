const  getOrdersDetails  = require("./getOrdersDetails");
const  createOrderDetail  = require("./createOrderDetail");
const getOrderDetailID =  require("./getOrderCompra");
const updateOrderDetail= require("./updateOrderDetail")
const getOrderCompra = require("./getOrderCompra");


module.exports = {
  
  createOrderDetail,
  getOrderDetailID, 
  updateOrderDetail,
  getOrderCompra
}