'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromoCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        PromoCode.hasOne(models.UsePromoCode,{
          foreignKey: 'id_code',
          as: 'usePromoCodes'
        });
    }
  }
  PromoCode.init({
    code: DataTypes.STRING,
    active: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PromoCode',
  });
  return PromoCode;
};