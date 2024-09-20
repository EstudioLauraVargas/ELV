
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      idCourse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagePublicId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      
      timestamps: false, // Ajusta según tus necesidades
    }
  );

  return Course;
};




