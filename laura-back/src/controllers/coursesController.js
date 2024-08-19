const { Course, Video, CourseVideos } = require("../data");
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
    const { idCourse } = req.params;
    const { title, description, addVideos, removeVideos } = req.body;

    // Buscar el curso por su ID
    const course = await Course.findByPk(idCourse, {
      include: [Video], // Incluye los videos asociados al curso
    });

    if (!course) return res.status(404).json({ message: "Curso no encontrado" });

    // Actualizar título y descripción
    await course.update({ title, description });

    // Eliminar videos si se proporcionan IDs de videos para eliminar
    if (removeVideos && removeVideos.length > 0) {
      await CourseVideos.destroy({
        where: {
          idVideo: removeVideos,
          idCourse: idCourse, // Asegurar que el video pertenece a este curso
        },
      });
    }

    // Agregar nuevos videos si se proporcionan
    if (addVideos && addVideos.length > 0) {
      const newVideos = addVideos.map((videoId) => ({
        idCourse: idCourse,
        idVideo: videoId,
      }));
      await CourseVideos.bulkCreate(newVideos, { ignoreDuplicates: true });
    }

    // Volver a obtener el curso con los videos actualizados
    const updatedCourse = await Course.findByPk(idCourse, {
      include: [Video],
    });

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error al actualizar el curso:", error);
    res.status(500).json({ message: "Error al actualizar el curso", error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;
    const course = await Course.findByPk(idCourse);
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