'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChallanConsignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ChallanConsignment.belongsTo(models.Challan, {
        foreignKey: 'challanId',
        as: 'challan'
    });
    }
  }
  ChallanConsignment.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    challanId:DataTypes.UUID,
    number: DataTypes.STRING,
    godownId: DataTypes.UUID,
    consignmentId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ChallanConsignment',
    tableName: 'challanConsignments'
  });
  return ChallanConsignment;
};