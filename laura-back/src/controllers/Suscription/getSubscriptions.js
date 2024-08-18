const { Subscription } = require("../../data");
const response = require('../../utils/response');

// Obtener todas las suscripciones
module.exports = async (req, res) => {
  try {
    // Obtener todas las suscripciones desde la base de datos
    const subscriptions = await Subscription.findAll();

    // Responder con éxito y los datos de suscripciones
    response(res, 200, subscriptions, 'Suscripciones obtenidas con éxito');
  } catch (error) {
    // Responder con error si algo sale mal
    response(res, 500, null, 'Error al obtener las suscripciones');
  }
};
