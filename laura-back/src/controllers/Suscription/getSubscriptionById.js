const { Subscription } = require('../../data');
const response = require('../../utils/response');

// Obtener una suscripción por ID
module.exports = async (req, res) => {
  const { idSub } = req.params;

  try {
    // Buscar la suscripción por su ID
    const subscription = await Subscription.findByPk(idSub);

    if (!subscription) {
      // Si no se encuentra la suscripción, responder con un estado 404
      return response(res, 404, null, 'Suscripción no encontrada');
    }

    // Responder con éxito y los datos de la suscripción
    response(res, 200, subscription, 'Suscripción obtenida con éxito');
  } catch (error) {
    // Responder con error si algo sale mal
    response(res, 500, null, 'Error al obtener la suscripción');
  }
};
