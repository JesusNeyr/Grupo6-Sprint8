'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shipping.belongsTo(models.Order,{
        foreignKey: "order_id",
        as: "orders"
      })
      Shipping.belongsTo(models.Payment,{
        foreignKey: "payment_id",
        as:"payments"
      })
    }
  }
  Shipping.init({
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    floor: DataTypes.STRING,
    cp: DataTypes.INTEGER,
    phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shipping',
  });
  return Shipping;
};