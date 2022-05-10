'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transporter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transporter.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'transporters',
    modelName: 'Transporter',
  });
  return Transporter;
};