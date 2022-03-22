'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsePromoCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsePromoCode.belongsTo(models.PromoCode,{
        foreignKey: 'id_code',
        as: 'promoCodes'
      })
      UsePromoCode.belongsTo(models.User,{
        foreignKey: 'id_user',
        as: "users"
      });
    }
  }
  UsePromoCode.init({
    id_code: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    used: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsePromoCode',
  });
  return UsePromoCode;
};