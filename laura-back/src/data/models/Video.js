const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Video', {
    idVideo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
   
  
  });
};

