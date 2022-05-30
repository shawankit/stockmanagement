module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'challans',
          'godownId',
          {
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'godowns',
                },
                key: 'id'
            }
          }
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'challans',
          'date'
      );
  }
};
  