const { OrderCompra, Subscription } = require("../../data");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const { n_document } = req.params;

    if (!n_document) {
      return response(res, 400, { error: "No se proporcionó n_document." });
    }

    const orders = await OrderCompra.findAll({
      where: { n_document },
      include: {
        model: Subscription,
        as: "subscriptions",
        attributes: ["id_subscription", "duration"], // o cualquier atributo relevante de suscripción
      },
    });

    const formattedOrders = orders.map((order) => ({
      id_orderCompra: order.id_orderCompra,
      date: order.date,
      amount: order.amount,
      state_order: order.state_order,
      subscriptions: order.subscriptions.map((sub) => ({
        id_subscription: sub.id_subscription,
        duration: sub.duration, // o cualquier otro campo relevante
      })),
    }));

    return response(res, 200, { orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return response(res, 500, { error: error.message });
  }
};

