'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('consignments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      month: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      consignmentNo: {
        type: Sequelize.STRING
      },
      transporter: {
        type: Sequelize.STRING
      },
      supplier: {
        type: Sequelize.STRING
      },
      privartMark: {
        type: Sequelize.STRING
      },
      numberOfPackage: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      item: {
        type: Sequelize.STRING
      },
      billNo: {
        type: Sequelize.STRING
      },
      billDate: {
        type: Sequelize.STRING
      },
      amountDeclared: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.STRING
      },
      ewaybillNo: {
        type: Sequelize.STRING
      },
      mrno: {
        type: Sequelize.STRING
      },
      mrdate: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      deliverydate: {
        type: Sequelize.STRING
      },
      challanNumber: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('consignments');
  }
};