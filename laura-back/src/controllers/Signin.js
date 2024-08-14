const { User } = require("../data");
const bcrypt = require("bcrypt");
const response = require("../utils/response");



module.exports (async (req, res) => {
    const { email, password } = req.body;
    
    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return response(res, 404, null, 'User not found');
    }
    
    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return response(res, 401, null, 'Incorrect password');
    }
    
    // Generar un token
    const token = generateToken(user); // Asumiendo que tienes una función generateToken
    
    // Responder con éxito
    response(res, 200, { token, user }, 'Signed in successfully');
  });


