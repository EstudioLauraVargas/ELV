const { User } = require("../../data/models");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const document = req.params.document;

    const user = await User.findOne({ where: { document: document } });

    if (!user) {
      return response(res, 404, "Usuario no encontrado");
    }

    response(res, 200, user);
  } catch (error) {
    console.error(error);
    response(res, 500, "Error al obtener el usuario");
  }
};