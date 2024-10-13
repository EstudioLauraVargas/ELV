const { Benefit } = require('../data'); // Asegúrate de ajustar la ruta según tu estructura de carpetas

// Crear un nuevo beneficio
const createBenefit = async (req, res) => {
  const { userId, courseId, grantedDate, endDate } = req.body;
  
  try {
    const newBenefit = await Benefit.create({ userId, courseId, grantedDate, endDate });
    return res.status(201).json(newBenefit);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el beneficio', error });
  }
};

// Obtener todos los beneficios
const getBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.findAll();
    return res.status(200).json(benefits);
  } catch (error) {
    console.error(error);
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
