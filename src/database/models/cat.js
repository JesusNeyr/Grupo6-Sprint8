'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    static associate(models) {
      Cat.hasMany(models.Product, {
        foreignKey: 'cat_id',
        as: "products"
      });
    }
  }
  Cat.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cat',
  });
  return Cat;
};