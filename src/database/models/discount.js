'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {
      Discount.hasMany(models.Product,{
        foreignKey: "discount_id",
        as: "discounts"
      })
    }
  }
  Discount.init({
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
};