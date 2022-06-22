'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Godown,ConsigmentLocation, ChallanConsignment}) {
      // define association here
      this.belongsToMany(Godown, {
        through: ConsigmentLocation,
        as: 'godowns',
        foreignKey: 'consignmentId',
        otherKey: 'godownId'
      });

      this.belongsToMany(Godown, {
        through: ChallanConsignment,
        as: 'challanGodowns',
        foreignKey: 'consignmentId',
        otherKey: 'godownId'
      });
    }
  }
  Consignment.init({
    month: DataTypes.STRING,
    entrydate: DataTypes.STRING,
    consignmentNo: DataTypes.STRING,
    transporter: DataTypes.STRING,
    supplier: DataTypes.STRING,
    privartMark: DataTypes.STRING,
    numberOfPackage: DataTypes.STRING,
    weight: DataTypes.STRING,
    quantity: DataTypes.STRING,
    item: DataTypes.STRING,
    billNo: DataTypes.STRING,
    billDate: DataTypes.STRING,
    amountDeclared: DataTypes.STRING,
    rate: DataTypes.STRING,
    ewaybillNo: DataTypes.STRING,
    mrno: DataTypes.STRING,
    mrdate: DataTypes.STRING,
    amount: DataTypes.STRING,
    deliverydate: DataTypes.STRING,
    challanNumber: DataTypes.STRING,
    godown: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'consignments',
    modelName: 'Consignment',
  });
  return Consignment;
};