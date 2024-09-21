// models/OrderCompra.js
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
      reference: { // Nuevo campo para vincular con Wompi
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true, // Asegura que cada referencia sea única
      },
      idSub: {
        type: DataTypes.INTEGER, 
        allowNull: true,
      },
      document: { // Relación con User
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      endDate: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      state_order: {
        type: DataTypes.ENUM('Activo', 'Pendiente', 'Finalizado'),
        allowNull: false,
        defaultValue: 'Pendiente',
      },
      transaction_status: {
        type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado', 'Fallido', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Pendiente',
      },
    },
    {
      timestamps: true,
    }
  );
};


