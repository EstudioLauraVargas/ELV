const { OrderCompra, Subscription, User, Course } = require("../../data");
const response = require("../../utils/response");
const { v4: uuidv4 } = require("uuid");
const { generarFirmaIntegridad } = require("../../utils/signature");
const { Op } = require("sequelize");

const secretoIntegridad = process.env.WOMPI_EVENT_KEY;

const calculateEndDate = (startDate, durationDays) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + durationDays);
  return date.toISOString().split('T')[0];
};

module.exports = async (req, res) => {
  try {
    // Log the request body to see what data is coming in
    console.log("Request Body:", req.body);
    
    const { date, amount, subscriptions, state_order, document, currency } = req.body;

    // Validación de los datos recibidos
    if (!date || !amount || !subscriptions || !state_order || !document || !currency) {
      console.log("Validation failed. Missing data in request.");
      return response(res, 400, { error: "Missing Ordering Data" });
    }

    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      console.log("Validation failed. Subscriptions must be a non-empty array.");
      return response(res, 400, { error: "Subscriptions must be a non-empty array" });
    }

    // Encuentra al usuario por su documento
    const user = await User.findByPk(document);
    if (!user) {
      console.log(`User not found for document: ${document}`);
      return response(res, 404, { error: "User not found" });
    }

    console.log("User found:", user);

    // Encuentra los cursos asociados a las suscripciones
    const courseIds = subscriptions.map(sub => sub.idCourse);
    console.log("Course IDs from subscriptions:", courseIds);

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
      console.log("Missing courses:", missing);
      return response(res, 404, { error: `Courses with ids ${missing.join(', ')} not found` });
    }

    console.log("Courses found:", courses);

    // Generar referencia y firma de integridad
    const referencia = uuidv4();
    const integritySignature = generarFirmaIntegridad(
      referencia,
      amount * 100,
      secretoIntegridad
    );

    // Busca los detalles de las suscripciones existentes
    const subscriptionDetails = await Subscription.findAll({
      where: {
        idSub: {
          [Op.in]: subscriptions.map(sub => sub.idSub),
        },
      },
    });

    console.log("Subscription Details:", subscriptionDetails);

    // Mapea las suscripciones existentes para obtener los días de duración
    const subscriptionMap = subscriptionDetails.reduce((map, sub) => {
      map[sub.idSub] = sub.durationDays;
      return map;
    }, {});

    console.log("Subscription Map:", subscriptionMap);

    // Calcula la duración máxima de las suscripciones seleccionadas
    const maxDuration = Math.max(...subscriptions.map(sub => subscriptionMap[sub.idSub] || 0));
    console.log("Max Duration:", maxDuration);
    
    const endDate = calculateEndDate(date, maxDuration);
    console.log("End Date Calculated:", endDate);

    // Crea la orden de compra
    const orderCompraData = {
      orderId: referencia,
      document,
      amount,
      state_order,
      transaction_status: 'Pendiente',
      startDate: date,
      endDate: endDate,
      integritySignature: integritySignature
    };

    console.log("OrderCompra Data:", orderCompraData);

    const orderCompra = await OrderCompra.create(orderCompraData);
    console.log("OrderCompra Created:", orderCompra);

    // Asociar la orden con las suscripciones existentes y los cursos seleccionados
    for (const sub of subscriptions) {
      await Subscription.update(
        { orderId: orderCompra.orderId, idCourse: sub.idCourse }, // Actualiza idCourse por separado
        {
          where: { idSub: sub.idSub },
        }
      );
    }

    // Busca la orden con las suscripciones ya asociadas para devolverla en la respuesta
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





