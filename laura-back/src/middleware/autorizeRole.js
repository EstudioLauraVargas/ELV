// middleware/authorizeRole.js
const authorizeRole = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
  
      if (roles.includes(userRole)) {
        return next(); // El usuario tiene uno de los roles permitidos
      } else {
        return res.status(403).json({ message: "No tienes permiso para acceder a esta ruta." });
      }
    };
  };
  
  module.exports = authorizeRole;
  