const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Benefit = sequelize.define(
    "Benefit",
    {
      userId: {
        type: DataTypes.STRING, // Asegúrate de que esto coincida con el tipo de 'document'
        allowNull: false,
        references: {
          model: 'Users', // Asegúrate de que coincida con el nombre real de la tabla
          key: 'document',
        },
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses', // Cambia 'Course' a 'Courses'
          key: 'idCourse',
        },
      },
      grantedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return Benefit;
};



