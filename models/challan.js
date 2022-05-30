'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Challan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Challan.hasMany(models.ChallanConsignment,  { foreignKey: 'challanId', as: 'challanConsignments' })
      Challan.belongsTo(models.ChallanConsignment,  { foreignKey: 'godownId', as: 'godown' })
    }
  }
  Challan.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    number: DataTypes.STRING,
    godownId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Challan',
    tableName: 'challans'
  });
  return Challan;
};