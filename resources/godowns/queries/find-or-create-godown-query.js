const { Godown } = require('models');
const R = require('ramda');
const { Sequelize } = require('sequelize');

module.exports = class FindOrCreateGodownQuery {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async get() {
        const [transporter,created] = await Godown.findOrCreate({
            where: {
                name : this.name
            },
            defaults: {
                id: this.id,
                name: this.name,
                address:''
            }
        });

        return transporter;
    }
};
