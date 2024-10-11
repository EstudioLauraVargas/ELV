const { Course, Video, CourseVideos } = require("../data");
const { sequelize } = require("../data/index");
const response = require("../utils/response")
const cloudinary = require('../config/cloudinaryConfig');


const addCourse = async (req, res) => {
  try {
    const { title, url, description, idVideo, imageUrl, imagePublicId } = req.body;

    // Validación básica
    if (!title) {
      return response(res, 400, null, "El título es obligatorio");
    }

    // Validar que idVideo sea un array si está presente
    if (idVideo && !Array.isArray(idVideo)) {
      return response(res, 400, null, "idVideo debe ser un array de IDs de videos");
    }

    // Crear el curso
    const newCourse = await Course.create({
      title,
      description,
      imageUrl: imageUrl || null,
      imagePublicId: imagePublicId || null,
    });
    console.log("Course created with ID:", newCourse.idCourse);

    // Asociar los videos existentes al curso
    if (idVideo && idVideo.length > 0) {
      // Verificar que los videos existen
      const videos = await Video.findAll({
        where: { idVideo: idVideo },
      });

      if (videos.length !== idVideo.length) {
        return response(res, 400, null, "Algunos videos no existen");
      }

      // Asociar los videos al curso
      await newCourse.addVideos(idVideo);
      console.log("Videos associated with course:", idVideo);
    }

    // Responder con el curso creado y los videos asociados
    const courseWithVideos = await Course.findByPk(newCourse.idCourse, {
      include: Video,
    });
    console.log("Course with videos:", courseWithVideos);

    response(res, 201, courseWithVideos, "Curso creado correctamente");
  } catch (error) {
    console.error("Error adding course:", error);
    response(res, 500, null, error.message || "Error al agregar el curso");
  }
};

const updateCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;
    const { title, description, addVideos, removeVideos, imageUrl, imagePublicId } = req.body;

    // Buscar el curso por su ID
    const course = await Course.findByPk(idCourse, {
      include: [Video],
    });

    if (!course) return res.status(404).json({ message: "Curso no encontrado" });

    let updateData = { title, description };

    // Si se proporciona una nueva imagen, actualizarla
    if (imageUrl && imagePublicId) {
      // Eliminar la imagen anterior de Cloudinary si existe
      if (course.imagePublicId) {
        await cloudinary.uploader.destroy(course.imagePublicId);
      }

      // Asignar la nueva imagen
      updateData.imageUrl = imageUrl;
      updateData.imagePublicId = imagePublicId;
    }

    // Actualizar el curso
    await course.update(updateData);

    // Eliminar videos si se proporcionan IDs de videos para eliminar
    if (removeVideos && removeVideos.length > 0) {
      await CourseVideos.destroy({
        where: {
          idVideo: removeVideos,
          idCourse: idCourse, // Asegurar que el video pertenece a este curso
        },
      });
    }

    
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

    // Eliminar la imagen de Cloudinary si existe
    if (course.imagePublicId) {
      await cloudinary.uploader.destroy(course.imagePublicId);
    }

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