'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Godown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Consignment,ConsigmentLocation}) {
      // define association here
      this.belongsToMany(Consignment, {
        through: ConsigmentLocation,
        as: 'consignments',
        foreignKey: 'godownId',
        otherKey: 'consignmentId'
      });
    }
  }
  Godown.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'godowns',
    modelName: 'Godown',
  });
  return Godown;
};