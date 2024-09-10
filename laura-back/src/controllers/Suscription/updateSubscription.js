const { Subscription } = require('../../data');
const response = require('../../utils/response');

// Actualizar una suscripción por ID
module.exports = async (req, res) => {
  const { idSub } = req.params;
  const { typeSub, durationDays, price, active } = req.body;

  try {
    // Buscar la suscripción por su ID
    const subscription = await Subscription.findByPk(idSub);

    if (!subscription) {
      // Si no se encuentra la suscripción, responder con un estado 404
      return response(res, 404, null, 'Suscripción no encontrada');
    }

    // Actualizar los campos de la suscripción solo si están presentes en la solicitud
    subscription.typeSub = typeSub || subscription.typeSub;
    subscription.durationDays = durationDays || subscription.durationDays;
    subscription.price = price || subscription.price;
    subscription.active = active !== undefined ? active : subscription.active;
   

    // Guardar los cambios en la base de datos
    await subscription.save();

    // Responder con éxito y los datos actualizados de la suscripción
    response(res, 200, subscription, 'Suscripción actualizada con éxito');
  } catch (error) {
    // Responder con error si algo sale mal
    response(res, 500, null, 'Error al actualizar la suscripción');
  }
};
