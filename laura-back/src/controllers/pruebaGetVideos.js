const { Video } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const videos = await Video.findAll();
    console.log("Users fetched successfully: ", videos);
    response(res, 200, videos);
  } catch (error) {
    console.error("Error al obtener los usuarios: ", error);
    response(res, 500, "Error al obtener los usuarios");
  }
};