const { Course, Video } = require("../data");
const response = require("../utils/response")

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: Video,
        through: { attributes: [] }, 
      },
    });

    response(res, 200, courses, "Cursos obtenidos correctamente");
  } catch (error) {
    response(res, 500, null, "Error al obtener los cursos");
  }
};

module.exports = getCourses;
