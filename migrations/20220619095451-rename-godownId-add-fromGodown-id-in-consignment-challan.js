'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('challanConsignments', 'godownId', 'fromGodownId');
    await queryInterface.addColumn('challanConsignments','toGodownId',Sequelize.UUID);
    await queryInterface.addColumn('challans','toGodownId',Sequelize.UUID);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('challanConsignments', 'fromGodownId', 'godownId');
    await queryInterface.removeColumn('challanConsignments','toGodownId');
    await queryInterface.removeColumn('challans','toGodownId');
  }
};
