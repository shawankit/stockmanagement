'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('consignments', 'date', 'entrydate');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('consignments', 'entrydate', 'date');
  }
};
