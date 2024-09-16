const { OrderCompra, Subscription } = require("../../data");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  const { orderId } = req.params;
  const { state_order, trackingNumber, transaction_status } = req.body;

  try {
    const orderCompra = await OrderCompra.findByPk(orderId);

    if (!orderCompra) {
      return response(res, 404, { error: "Order Detail not found" });
    }

    const validStatesOrder = [
      "Pedido Realizado",
      "Activo",
      "Finalizado"
    ];

    if (state_order && !validStatesOrder.includes(state_order)) {
      return response(res, 400, { error: `Invalid state_order value: ${state_order}` });
    }

    const validTransactionStates = [
      "Pendiente",
      "Aprobado",
      "Rechazado",
      "Fallido",
      "Cancelado",
    ];

    if (
      transaction_status &&
      !validTransactionStates.includes(transaction_status)
    ) {
      return response(res, 400, { error: `Invalid transaction_status value: ${transaction_status}` });
    }

    if (state_order) {
      orderCompra.state_order = state_order;
    }

    if (trackingNumber) {
      orderCompra.trackingNumber = trackingNumber;
    }

    if (transaction_status) {
      orderCompra.transaction_status = transaction_status;
    }

    await orderCompra.save();

    return response(res, 200, { orderCompra });
  } catch (error) {
    console.error("Error updating order detail:", error);
    return response(res, 500, { error: error.message });
  }
};


