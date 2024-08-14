const { Course } = require("../data");

const addCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newCourse = await Course.create({ title, description, price });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el curso", error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });
    await course.update({ title, description, price });
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