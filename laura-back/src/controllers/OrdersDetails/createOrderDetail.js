// controllers/OrdersDetails/createOrderDetail.js
const { OrderCompra, Subscription, User, Course } = require("../../data");
const response = require("../../utils/response");
const { generarFirmaIntegridad } = require("../../utils/signature");
const { Op } = require("sequelize");

const secretoIntegridad = process.env.WOMPI_INTEGRITY_SECRET;

// Función para calcular la fecha de fin (endDate) sumando días a la fecha de inicio (startDate)
const calculateEndDate = (startDate, durationDays) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + durationDays); // Sumar los días de duración
  return date.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
};

module.exports = async (req, res) => {
  console.log("----- Crear Orden -----");
  try {
    const { date, amount, subscriptions, state_order, document, currency, orderId } = req.body;

    // Validaciones de los datos requeridos
    if (!date || !amount || !subscriptions || !state_order || !document || !currency || !orderId) {
      return response(res, 400, { error: "Missing Ordering Data" });
    }

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      return response(res, 400, { error: "Subscriptions must be a non-empty array" });
    }

    // Encuentra al usuario
    const user = await User.findByPk(document);
    if (!user) {
      return response(res, 404, { error: "User not found" });
    }

    // Encuentra los cursos asociados a las suscripciones
    const courseIds = subscriptions.map(sub => sub.idCourse);
    const courses = await Course.findAll({
      where: {
        idCourse: {
          [Op.in]: courseIds,
        },
      },
    });

    if (courses.length !== courseIds.length) {
      const existingCourseIds = courses.map(c => c.idCourse);
      const missing = courseIds.filter(id => !existingCourseIds.includes(id));
      return response(res, 404, { error: `Courses with ids ${missing.join(', ')} not found `});
    }

    // Validar que el orderId no exista ya en la base de datos
    const existingOrder = await OrderCompra.findOne({ where: { orderId } });
    if (existingOrder) {
      return response(res, 400, { error: "Order ID already exists" });
    }

    // Generar firma de integridad
    const integritySignature = generarFirmaIntegridad(
      orderId,
      amount * 100, // Wompi maneja los montos en centavos
      currency,
      secretoIntegridad
    );

    // Encontrar duración máxima de las suscripciones
    const subscriptionDetails = await Subscription.findAll({
      where: {
        idSub: {
          [Op.in]: subscriptions.map(sub => sub.idSub),
        },
      },
    });

    const subscriptionMap = subscriptionDetails.reduce((map, sub) => {
      map[sub.idSub] = sub.durationDays;
      return map;
    }, {});

    const maxDuration = Math.max(...subscriptions.map(sub => subscriptionMap[sub.idSub] || 0));
    const endDate = calculateEndDate(date, maxDuration);

    // Crear la orden en la base de datos
    const orderCompraData = {
      orderId: orderId, // Usa el orderId que viene de Wompi
      document,
      amount,
      state_order,
      transaction_status: 'Pendiente',
      startDate: date,
      endDate: endDate,
      integritySignature: integritySignature
    };

    const orderCompra = await OrderCompra.create(orderCompraData);

    // Asociar las suscripciones a la orden
    const subscriptionIds = subscriptions.map(sub => sub.idSub);
    await orderCompra.addSubscriptions(subscriptionIds);

    // Incluir las suscripciones y cursos en la orden creada para retornar la información completa
    const updatedOrderCompra = await OrderCompra.findOne({
      where: { orderId: orderCompra.orderId },
      include: {
        model: Subscription,
        include: [
          {
            model: Course,
            attributes: ["idCourse", "title"],
          },
        ],
      },
    });

    console.log("Orden creada:", updatedOrderCompra);

    // Devolver la orden creada junto con la firma de integridad para usarla en el widget
    return response(res, 201, {
      orderCompra: updatedOrderCompra,
      signature: integritySignature,
    });

  } catch (error) {
    console.error("Error creating orderCompra:", error);
    return response(res, 500, { error: error.message });
  }
};



