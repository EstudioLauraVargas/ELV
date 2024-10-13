const { Benefit,User, Course } = require('../data'); // Asegúrate de ajustar la ruta según tu estructura de carpetas

// Crear un nuevo beneficio
const createBenefit = async (req, res) => {
  const { userName, courseTitle, grantedDate, endDate } = req.body;

  try {
    // Buscar al usuario por nombre
    const user = await User.findOne({ where: { name: userName } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Buscar el curso por título
    const course = await Course.findOne({ where: { title: courseTitle } });
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Crear el beneficio
    const benefit = await Benefit.create({
      userId: user.id,
      courseId: course.id,
      grantedDate,
      endDate,
    });

    return res.status(201).json(benefit);
  } catch (error) {
    console.error('Error al crear beneficio:', error);
    return res.status(500).json({ message: 'Error al crear beneficio', error });
  }
};

// Obtener todos los beneficios
const getBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],  // Traer solo el nombre del usuario
        },
        {
          model: Course,
          attributes: ['title'],  // Traer solo el título del curso
        },
      ],
    });

    return res.status(200).json(benefits);
  } catch (error) {
    console.error('Error al obtener beneficios:', error);
    return res.status(500).json({ message: 'Error al obtener beneficios', error });
  }
};

// Obtener un beneficio por ID
const getBenefitById = async (req, res) => {
  const { id } = req.params;

  try {
    const benefit = await Benefit.findByPk(id);
    if (!benefit) {
      return res.status(404).json({ message: 'Beneficio no encontrado' });
    }
    return res.status(200).json(benefit);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el beneficio', error });
  }
};

// Editar un beneficio
const updateBenefit = async (req, res) => {
  const { id } = req.params;
  const { userId, courseId, grantedDate, endDate } = req.body;

  try {
    const [updated] = await Benefit.update(
      { userId, courseId, grantedDate, endDate },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Beneficio no encontrado' });
    }

    const updatedBenefit = await Benefit.findByPk(id);
    return res.status(200).json(updatedBenefit);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el beneficio', error });
  }
};

// Eliminar un beneficio
const deleteBenefit = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Benefit.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Beneficio no encontrado' });
    }
    return res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el beneficio', error });
  }
};

// Obtener beneficios por usuario
const getBenefitsByUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const benefits = await Benefit.findAll({ where: { userId } });
      
      if (benefits.length === 0) {
        return res.status(404).json({ message: 'No se encontraron beneficios para este usuario' });
      }
      
      return res.status(200).json(benefits);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener los beneficios por usuario', error });
    }
  };
  

module.exports = {
  createBenefit,
  getBenefits,
  getBenefitById,
  updateBenefit,
  deleteBenefit,
  getBenefitsByUser
};
