const { OrderCompra, Subscription } = require("../../data");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  const { orderId } = req.params;
  const { state_order, trackingNumber, transaction_status } = req.body;

  try {
    const orderCompra = await OrderCompra.findByPk(orderId);

    // Verifica si existe la orden
    if (!orderCompra) {
      return response(res, 404, { error: "Order not found" });
    }

    // Validación de estado de la orden (state_order)
    const validStatesOrder = ["Pedido Realizado", "Activo", "Finalizado"];
    if (state_order && !validStatesOrder.includes(state_order)) {
      return response(res, 400, { error: `Invalid state_order value: ${state_order}` });
    }

    // Validación del estado de la transacción (transaction_status)
    const validTransactionStates = ["Pendiente", "Aprobado", "Rechazado", "Fallido", "Cancelado"];
    if (transaction_status && !validTransactionStates.includes(transaction_status)) {
      return response(res, 400, { error: `Invalid transaction_status value: ${transaction_status}` });
    }

    // Actualización de los campos en la orden si existen
    if (state_order) {
      orderCompra.state_order = state_order;
    }

    if (trackingNumber) {
      orderCompra.trackingNumber = trackingNumber;
    }

    if (transaction_status) {
      orderCompra.transaction_status = transaction_status;
    }

    // Guarda los cambios en la orden
    await orderCompra.save();

    // Devuelve la orden actualizada
    return response(res, 200, { message: "Order updated successfully", orderCompra });
  } catch (error) {
    console.error(`Error updating order with ID ${orderId}:`, error);
    return response(res, 500, { error: "An error occurred while updating the order." });
  }
};



