const { OrderCompra, Subscription, User, Course } = require("../../data");
const response = require("../../utils/response");
const { v4: uuidv4 } = require("uuid");
const { generarFirmaIntegridad } = require("../../utils/signature"); // Si usas esta firma para tus propósitos internos
const { Op } = require("sequelize");
const crypto = require('crypto'); 

const secretoIntegridad = "test_integrity_VMVZ36lyoQot5DsN0fBXAmp4onT5T86G";

/**
 * Función para generar la firma de integridad.
 */
function generarFirmaIntegridad(orderId, monto, moneda, secretoIntegridad) {
  const cadenaConcatenada = `${orderId}${monto}${moneda}${secretoIntegridad}`;
  return crypto.createHash("sha256").update(cadenaConcatenada).digest("hex");
}

// Función para calcular la fecha de fin (endDate) sumando días a la fecha de inicio (startDate)
const calculateEndDate = (startDate, durationDays) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + durationDays); // Sumar los días de duración
  return date.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
};

module.exports = async (req, res) => {
  try {
    const { date, amount, subscriptions, state_order, document, currency } = req.body;

    if (!date || !amount || !subscriptions || !state_order || !document || !currency) {
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

    // Generar referencia y firma de integridad
    const referencia = `SO-${uuidv4()}`;
    const integritySignature = generarFirmaIntegridad(
      referencia,
      amount * 100,
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

    const orderCompraData = {
      orderId: referencia, // Asegúrate de usar 'referencia' como 'orderId'
      document,
      amount,
      state_order,
      transaction_status: 'Pendiente',
      startDate: date,
      endDate: endDate,
      integritySignature: integritySignature // Guarda la firma de integridad si es necesario
    };

    const orderCompra = await OrderCompra.create(orderCompraData);

    // No necesitas crear OrderDetail, pero aquí puedes agregar lógica si es necesario.

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

    return response(res, 201, { orderCompra: updatedOrderCompra });
  } catch (error) {
    console.error("Error creating orderCompra:", error);
    return response(res, 500, { error: error.message });
  }
};
