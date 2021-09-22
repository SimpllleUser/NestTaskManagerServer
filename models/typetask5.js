'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeTask5 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TypeTask5.init({
    id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'TypeTask5',
  });
  return TypeTask5;
};