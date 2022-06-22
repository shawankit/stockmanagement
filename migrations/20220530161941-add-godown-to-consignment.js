module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'consignments',
          'godown',
          Sequelize.STRING
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'consignments',
          'godown'
      );
  }
};
  