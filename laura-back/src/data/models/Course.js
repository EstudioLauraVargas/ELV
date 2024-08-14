const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
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
      
      
    },
    
  );
};


