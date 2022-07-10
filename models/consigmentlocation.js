'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConsigmentLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ConsigmentLocation.belongsTo(models.Godown, { foreignKey: 'godownId', as: 'godowns' });
      ConsigmentLocation.belongsTo(models.Consignment, { foreignKey: 'consignmentId', as: 'consignments' });
    }
  }
  ConsigmentLocation.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
    consignmentId: DataTypes.UUID,
    godownId: DataTypes.UUID,
    date: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'consigmentLocations',
    modelName: 'ConsigmentLocation',
  });

  return ConsigmentLocation;
};