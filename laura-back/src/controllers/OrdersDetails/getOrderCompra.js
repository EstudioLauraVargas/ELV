const { OrderCompra, Subscription, Course } = require("../../data");
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
        attributes: ["idSub", "durationDays"], 
        include: {
          model: Course, 
          attributes: ["idCourse", "title"], 
        },
      },
    });

    // Asegurarnos de que orders exista y sea un array
    const formattedOrders = orders.map((order) => ({
      orderId: order.orderId,
      document: order.document, // Agrega el documento aquí
      startDate: order.startDate, // Asegúrate de que este campo esté en tu modelo
      endDate: order.endDate, // Agrega el endDate aquí
      amount: order.amount,
      state_order: order.state_order,
      subscriptions: order.Subscriptions?.map((sub) => ({
        idSub: sub.idSub,
        durationDays: sub.durationDays,
        course: sub.Course
          ? {
              idCourse: sub.Course.idCourse,
              title: sub.Course.title,
            }
          : null, // Asegúrate de manejar si no hay un curso asociado
      })) || [], // Si no hay suscripciones, devolvemos un array vacío
    }));

    return response(res, 200, { orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return response(res, 500, { error: error.message });
  }
};


