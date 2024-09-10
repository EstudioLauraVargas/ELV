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
          },
          date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      state_order: {
        type: DataTypes.ENUM( 'Activo Desde', 'Activo Hasta'),
        allowNull: false,
       
      },
      integritySignature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transaction_status: {
        type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado', 'Fallido', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Pendiente',  
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }

        },

  );
};