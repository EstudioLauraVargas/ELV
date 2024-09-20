const { OrderCompra, Subscription } = require('../../data');
const response = require('../../utils/response');

const confirmOrderPayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Busca la orden por ID
    const order = await OrderCompra.findByPk(orderId);

    if (!order) {
      return response(res, 404, null, 'Order not found');
    }

    // Verifica el estado de la transacción
    if (order.transaction_status !== 'Aprobado') {
      return response(res, 400, null, 'Transaction not approved yet');
    }

    // Obtener la suscripción relacionada
    const subscription = await Subscription.findByPk(order.idSub);

    if (!subscription) {
      return response(res, 404, null, 'Subscription not found');
    }

    // Calcular la fecha de finalización de la suscripción
    const startDate = new Date(order.startDate || new Date());
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + subscription.durationDays);

    // Actualizar la orden con el nuevo estado y fecha de finalización
    await order.update({
      state_order: 'Activo',
      startDate: startDate,
      endDate: endDate
    });

    // Respuesta exitosa
    return response(res, 200, {
      orderId: order.id,
      startDate: order.startDate,
      endDate: order.endDate
    }, 'Order and subscription activated successfully');

  } catch (error) {
    console.error('Error confirming order payment:', error);
    return response(res, 500, null, 'Server error');
  }
};

module.exports = confirmOrderPayment;

  