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

function calculateEndDate(startDate, duration) {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + duration); 
  return end.toISOString().split('T')[0]; 
}

module.exports = async (req, res) => {
  try {
    const { date, amount, subscriptions, state_order, document, currency } = req.body;

    if (!date || !amount || !subscriptions || !state_order || !document || !currency) {
      return response(res, 400, { error: "Missing Ordering Data" });
    }

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      return response(res, 400, { error: "Subscriptions must be a non-empty array" });
    }

    const user = await User.findByPk(document);
    if (!user) {
      return response(res, 404, { error: "User not found" });
    }

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

   
    const referencia = `SO-${uuidv4()}`;
    const integritySignature = generarFirmaIntegridad(
      referencia,
      amount * 100,
      currency,
      secretoIntegridad
    );

    const maxDuration = Math.max(...subscriptions.map(sub => sub.durationDays));
    const endDate = calculateEndDate(date, maxDuration);

    const orderCompraData = {
      orderId: uuidv4(),
      document,
    
      amount,
      state_order,
      transaction_status: 'Pendiente', 
      startDate: date,
      endDate: endDate,
    };

    // Crear la orden de compra sin transacción
    const orderCompra = await OrderCompra.create(orderCompraData);

    const subscriptionUpdates = subscriptions.map((sub) => ({
      document: document,
      idCourse: sub.idCourse, 
      orderCompraId: orderCompra.orderId,
      durationDays: sub.durationDays, 
      startDate: date, 
      endDate: calculateEndDate(date, sub.durationDays), 
      status: 'Active', 
      active: true,
      price: sub.price, 
      typeSub: sub.typeSub, 
    }));

    const createdSubscriptions = await Subscription.bulkCreate(subscriptionUpdates);

// Actualiza el idSub en la orden si es necesario
const firstSubscription = createdSubscriptions[0]; // Si hay una relación de uno a uno
if (firstSubscription) {
  await orderCompra.update({ idSub: firstSubscription.id });
}

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
    return response(res, 201, { orderCompra: updatedOrderCompra });
  } catch (error) {
    console.error("Error creating orderCompra:", error);
    return response(res, 500, { error: error.message });
  }
};