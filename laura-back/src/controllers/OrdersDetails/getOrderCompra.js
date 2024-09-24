const { OrderCompra, Subscription } = require("../../data");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const { document } = req.params;

    // Si no se proporciona el documento, listar todas las órdenes
    const whereClause = document ? { document } : {};

    const orders = await OrderCompra.findAll({
      where: whereClause,
      include: {
        model: Subscription,
        attributes: ["idSub", "durationDays"], // o cualquier atributo relevante de suscripción
      },
    });

    // Asegurarnos de que orders exista y sea un array
    const formattedOrders = orders.map((order) => ({
      orderId: order.orderId,
      date: order.date,
      amount: order.amount,
      state_order: order.state_order,
      // Asegurarnos de que subscriptions exista antes de mapear
      subscriptions: order.Subscriptions?.map((sub) => ({
        idSub: sub.idSub,
        durationDays: sub.durationDays, // o cualquier otro campo relevante
      })) || [], // Si no hay suscripciones, devolvemos un array vacío
    }));

    return response(res, 200, { orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return response(res, 500, { error: error.message });
  }
};

