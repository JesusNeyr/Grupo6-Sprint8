'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Address,{
        foreignKey: 'user_id',
        as: "addresses"
      });
      User.hasOne(models.Order,{
        foreignKey:"user_id",
        as:"orders"
      })
      User.belongsTo(models.Avatar,{
        foreignKey:"avatar_id",
        as:"avatars"
      })
      User.belongsTo(models.Rol,{
        foreignKey:"rol_id",
        as:"rols"
      })
      User.belongsToMany(models.Product,{
        as: "products",
        through: "visiteds",
        foreignKey: "user_id",
        otherKey: "product_id",
        timestamps: false
      })
      User.hasOne(models.UsePromoCode,{
        foreignKey: 'id_user',
        as: "userpromocodes"
      });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    avatar_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};