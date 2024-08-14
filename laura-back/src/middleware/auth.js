const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = { generateToken, verifyToken };

