const { Course, Video, CourseVideos } = require("../data");
const { sequelize } = require("../data");
const response = require("../utils/response")


const addCourse = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { title, description, idVideo } = req.body;

    console.log("Received request to create course with title:", title);
    console.log("Course description:", description);
    console.log("Video IDs to associate:", idVideo);

    // Validación básica
    if (!title) {
      return response(res, 400, null, "El título es obligatorio");
    }

    // Validar que idVideo sea un array si está presente
    if (idVideo && !Array.isArray(idVideo)) {
      return response(res, 400, null, "idVideo debe ser un array de IDs de videos");
    }

    // Crear el curso dentro de una transacción
    const newCourse = await Course.create(
      { title, description },
      { transaction }
    );
    console.log("Course created with ID:", newCourse.idCourse);

    // Asociar los videos existentes al curso
    if (idVideo && idVideo.length > 0) {
      // Verificar que los videos existen
      const videos = await Video.findAll({
        where: { idVideo: idVideo },
        transaction,
      });

      if (videos.length !== idVideo.length) {
        throw new Error("Algunos videos no existen");
      }

      await newCourse.addVideos(idVideo, { transaction });
      console.log("Videos associated with course:", idVideo);
    }

    // Confirmar la transacción
    await transaction.commit();

    // Responder con el curso creado y los videos asociados
    const courseWithVideos = await Course.findByPk(newCourse.idCourse, {
      include: Video,
    });
    console.log("Course with videos:", courseWithVideos);

    response(res, 201, courseWithVideos, "Curso creado correctamente");
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error("Error adding course:", error);
    response(res, 500, null, error.message || "Error al agregar el curso");
  }
};




const updateCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;
    const { title, description, addVideos, removeVideos } = req.body;

    // Buscar el curso por su ID
    const course = await Course.findByPk(idCourse, {
      include: [Video], 
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