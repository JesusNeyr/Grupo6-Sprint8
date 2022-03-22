'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.hasOne(models.Order,{
        foreignKey: "payments_id",
        as: "orders"
      });
      Payment.hasOne(models.Shipping, {
        foreignKey: "payments_id",
        as: "shippings"
      })

    }
  }
  Payment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};