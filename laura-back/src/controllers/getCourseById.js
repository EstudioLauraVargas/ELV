const { Course, Video } = require("../data");
const response = require("../utils/response");

const getCourseById = async (req, res) => {
  try {
    const { idCourse } = req.params;

    // Buscar el curso por ID y incluir los videos asociados
    const course = await Course.findByPk(idCourse, {
      include: {
        model: Video,
        through: { attributes: [] }, // Excluir la tabla intermedia `CourseVideos` de la respuesta
      },
    });

    if (!course) {
      return response(res, 404, null, "Curso no encontrado");
    }

    response(res, 200, course, "Curso obtenido correctamente");
  } catch (error) {
    response(res, 500, null, "Error al obtener el curso");
  }
};

module.exports = getCourseById;
