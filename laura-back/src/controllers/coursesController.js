const { Course, Video } = require("../data");
const { sequelize } = require("../data");
const response = require("../utils/response")


const addCourse = async (req, res) => {
  try {
    const { title, description, idVideo } = req.body;

    console.log("Received request to create course with title:", title);
    console.log("Course description:", description);
    console.log("Video IDs to associate:", idVideo);

    // Crear el curso
    const newCourse = await Course.create({ title, description });
    console.log("Course created with ID:", newCourse.idCourse);

    // Asociar los videos existentes al curso
    if (idVideo && idVideo.length > 0) {
      // Asegúrate de que los IDs de videos son válidos
      try {
        await newCourse.addVideos(idVideo);
        console.log("Videos associated with course:", idVideo);
      } catch (associationError) {
        console.error("Error associating videos with course:", associationError);
        throw associationError; // Re-lanzar el error para manejarlo en el bloque catch principal
      }
    }

    // Responder con el curso creado y los videos asociados
    const courseWithVideos = await Course.findByPk(newCourse.idCourse, {
      include: Video,
    });
    console.log("Course with videos:", courseWithVideos);

    response(res, 201, courseWithVideos, "Curso creado correctamente");
  } catch (error) {
    console.error("Error adding course:", error);
    response(res, 500, null, "Error al agregar el curso");
  }
};



const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });
    await course.update({ title, description });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el curso", error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });
    await course.destroy();
    res.status(200).json({ message: "Curso eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el curso", error });
  }
};

module.exports = {
  addCourse,
  updateCourse,
  deleteCourse,
};