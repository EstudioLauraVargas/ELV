const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth");
const User = require("../models/User");

module.exports = async (req, res) => {
  const {
    document,
    documentType,
    name,
    lastName,
    sex,
    email,
    password,
    birthDate,
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      documentType,
      name,
      lastName,
      birthDate,
      sex,
      document,
    });
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
