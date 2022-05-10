const { Transporter } = require('models');
const R = require('ramda');
const { Sequelize } = require('sequelize');

module.exports = class FindOrCreateTransporterQuery {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async get() {
        const [transporter,created] = await Transporter.findOrCreate({
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
