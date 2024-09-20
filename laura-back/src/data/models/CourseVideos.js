// models/CourseVideos.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CourseVideos = sequelize.define(
    "CourseVideos",
    {
      idCourse: {
        type: DataTypes.INTEGER,
        references: {
          model: "courses",
          key: "idCourse",
        },
        primaryKey: true,
      },
      idVideo: {
        type: DataTypes.INTEGER,
        references: {
          model: "videos",
          key: "idVideo",
        },
        primaryKey: true,
      },
    },
    {
      tableName: "CourseVideos",
      timestamps: false, // Ajusta según tus necesidades
    }
  );

  return CourseVideos;
};
