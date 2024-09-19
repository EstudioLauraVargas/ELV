// models/Subscription.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Subscription",
    {
      idSub: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      typeSub: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      durationDays: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'document',
        },
      },
      
      idCourse: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Course', 
          key: 'idCourse',
        },
      },
     
      orderCompraId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'OrderCompra', 
          key: 'orderId',
        },
      },
     
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active',
      },
    },
    {
      timestamps: true,
    }
  );
};

