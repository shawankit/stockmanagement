'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('challanConsignments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      number: {
        type: Sequelize.STRING
      },
      challanId: {
        type: Sequelize.UUID,
        references: {
            model: {
                tableName: 'challans',
            },
            key: 'id'
        }
      },
      godownId: {
        type: Sequelize.UUID
      },
      consignmentId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('challanConsignments');
  }
};