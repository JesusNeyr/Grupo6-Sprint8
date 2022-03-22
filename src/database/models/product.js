'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsTo(models.Cat, {
        foreignKey: 'cat_id',
        as: "cats"
      });
      Product.belongsTo(models.Size,{
        foreignKey: 'size_id',
        as: 'sizes'
      });
      Product.belongsTo(models.Discount,{
        foreignKey: 'discount_id',
        as: "discounts"
      });
      Product.hasMany(models.Image,{
        foreignKey: "id_products",
        as: "images"
      });
      Product.hasOne(models.OrderDetail, {
        foreignKey: "product_id",
        as: "orderDetails"
      });

      //BelongsToMany
      Product.belongsToMany(models.User,{
        as: "users",
        through: "visiteds",
        foreignKey: "product_id",
        otherKey: "user_id",
        timestamps: false
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price_inv: DataTypes.INTEGER,
    price_who: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    stock_min: DataTypes.INTEGER,
    stock_max: DataTypes.INTEGER,
    cat_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    visibility: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};