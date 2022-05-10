const { Supplier } = require('models');
const R = require('ramda');
const { Sequelize } = require('sequelize');

module.exports = class FindOrCreateSupplierQuery {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async get() {
        const [transporter,created] = await Supplier.findOrCreate({
            where: {
                name : this.name
            },
            defaults: {
                id: this.id,
                name: this.name
            }
        });
        console.log(created);

        return transporter;
    }
};
