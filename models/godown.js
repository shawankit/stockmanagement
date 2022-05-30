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
    static associate({Consignment,ConsigmentLocation, ChallanConsignment, Challan}) {
      // define association here
      this.belongsToMany(Consignment, {
        through: ConsigmentLocation,
        as: 'consignments',
        foreignKey: 'godownId',
        otherKey: 'consignmentId'
      });

      this.belongsToMany(Consignment, {
        through: ChallanConsignment,
        as: 'challanConsignments',
        foreignKey: 'godownId',
        otherKey: 'consignmentId'
      });

      this.hasMany(Challan,  { foreignKey: 'godownId', as: 'challans' })
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