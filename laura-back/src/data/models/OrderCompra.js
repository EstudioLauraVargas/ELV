const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'OrderCompra',
    {
        orderId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          
          id_Sub: {
            type: DataTypes.UUID,
            allowNull: false,
          }
        },
  );
};