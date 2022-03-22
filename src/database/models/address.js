'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    
    static associate(models) {
      Address.belongsTo(models.User,{
        foreignKey: "user_id",
        as:"users"
      })
      Address.hasOne(models.OrderDetail,{
        foreignKey: "user_add_id",
        as: "orderdetails"
      })
    }
  }
  Address.init({
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    cp: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    floor: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};