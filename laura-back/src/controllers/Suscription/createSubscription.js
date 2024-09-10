// src/controllers/subscriptionController.js
const { Subscription } = require("../../data"); // Ajusta la ruta si es necesario
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const { typeSub,  durationDays, price } = req.body;

    // Validar los datos de entrada
    if (!typeSub || !durationDays || !price) {
      return response(res, 400, null, 'Faltan datos requeridos');
    }

    // Crear la suscripción
    const newSubscription = await Subscription.create({
      typeSub,
      durationDays,
      price
    });

    response(res, 201, newSubscription, 'Suscripción creada con éxito');
  } catch (error) {
    console.error('Error al crear la suscripción:', error);
    response(res, 500, null, 'Error interno del servidor');
  }
};

