const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Video", {
    idVideo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    youtube_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  });
};
