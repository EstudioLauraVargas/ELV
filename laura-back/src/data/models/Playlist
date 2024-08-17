const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Playlist = sequelize.define("Playlist", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Playlist;
};