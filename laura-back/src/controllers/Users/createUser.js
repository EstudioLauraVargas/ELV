const User  = require("../../data");
const response = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    try {
      const user = req.body;

    if (!user.document||
        !user.documentType||
        !user.name||
        !user.lastName||
        !user.sex||
        !user.email||
        !user.password||
        !user.birthDate) {
      return response(res, 400, "Todos los campos son obligatorios");
    }

    // Verificar si el email ya está registrado
    const existingEmail = await User.findOne({ where: { email: user.email } });
    if (existingEmail) {
      return response(res, 400, "El email ya está registrado. Por favor, utilice otro email.");
    }

    // Verificar si el número de documento ya está registrado
    const existingDocument = await User.findOne({ where: { ndocument: user.document } });
    if (existingDocument) {
      return response(res, 400, "El número de documento ya está registrado.");
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(user.password, 10);

    // Crear usuario en la base de datos
    const newUser = await User.create({
       document :user.document,
       documentType :user.documentType,
       name :user.name,
       lastName :user.lastName,
       sex :user.sex,
        email:user.email,
        password:user.password,
        birthDate:user.birthDate
    });

    // Crear token
    const token = jwt.sign({ document: newUser.document, role: newUser.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h'
    });

    response(res, 201, { message: "Usuario creado con éxito", token });
  } catch (error) {
    console.error(error);
    response(res, 500, "Error al crear el usuario");
  }
};