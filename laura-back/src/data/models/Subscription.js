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
      typeSub:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessStartDate: {
        type: DataTypes.DATE,
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
      subscriptionReminderSent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
