// controllers/OrdersDetails/createOrderDetail.js
const { OrderCompra, Subscription, User, Course } = require("../../data");
const response = require("../../utils/response");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { Op } = require("sequelize");

const secretoIntegridad = "test_integrity_VMVZ36lyoQot5DsN0fBXAmp4onT5T86G";

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
      return res.status(400).json({ error: "Missing Ordering Data" });
    }

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      return res.status(400).json({ error: "Subscriptions must be a non-empty array" });
    }

    // Buscar las suscripciones en la base de datos
    const subscriptionIds = subscriptions.map(sub => sub.idSub);
    const availableSubscriptions = await Subscription.findAll({
      where: {
        idSub: {
          [Op.in]: subscriptionIds,
        },
      },
    });

    // Verificar si todas las suscripciones seleccionadas existen
    if (availableSubscriptions.length !== subscriptionIds.length) {
      const existingSubscriptionIds = availableSubscriptions.map(s => s.idSub);
      const missing = subscriptionIds.filter(id => !existingSubscriptionIds.includes(id));
      return res.status(404).json({ error: `Subscriptions with ids ${missing.join(', ')} not found` });
    }

    // Obtener la duración de días para la suscripción seleccionada
    const subscriptionMap = availableSubscriptions.reduce((map, sub) => {
      map[sub.idSub] = sub.durationDays;
      return map;
    }, {});

    // Obtener la duración máxima de días
    const maxDuration = Math.max(...subscriptions.map(sub => subscriptionMap[sub.idSub]));
    const endDate = calculateEndDate(date, maxDuration);

    const orderCompraData = {
      orderId: uuidv4(),
      document,
      amount,
      state_order,
      transaction_status: 'Pendiente',
      startDate: date,
      endDate: endDate, // Incluye el endDate calculado
    };

    const orderCompra = await OrderCompra.create(orderCompraData);

    const subscriptionUpdates = subscriptions.map((sub) => {
      const durationDays = subscriptionMap[sub.idSub]; // Obtén la duración de días para la suscripción
      return {
        document: document,
        idCourse: sub.idCourse,
        orderCompraId: orderCompra.orderId,
        durationDays: durationDays, // Usa la duración de días obtenida
        startDate: date,
        endDate: calculateEndDate(date, durationDays), // Calcula el endDate para cada suscripción
        status: 'Active',
        active: true,
        price: sub.price,
        typeSub: sub.typeSub
      };
    });

    await Subscription.bulkCreate(subscriptionUpdates);

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

    console.log("Order created:", updatedOrderCompra);
    return res.status(201).json({ orderCompra: updatedOrderCompra });
  } catch (error) {
    console.error("Error creating orderCompra:", error);
    return res.status(500).json({ error: error.message });
  }
};