module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'consigmentLocations',
          'date',
          Sequelize.STRING
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'consigmentLocations',
          'date'
      );
  }
};
  