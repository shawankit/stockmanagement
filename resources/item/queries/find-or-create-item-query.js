const { Item } = require('models');
const R = require('ramda');
const { Sequelize } = require('sequelize');

module.exports = class FindOrCreateItemQuery {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async get() {
        const [transporter,created] = await Item.findOrCreate({
            where: {
                name : this.name
            },
            defaults: {
                id: this.id,
                name: this.name
            }
        });

        return transporter;
    }
};
