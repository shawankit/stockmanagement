const { Godown } = require('models');
const R = require('ramda');
const { Sequelize } = require('sequelize');

module.exports = class GetGodownByIdQuery {
    constructor(id){
        this.id = id;
    }

    async get() {
        return Godown.findOne({
            where: {
                id : this.id
            }
        });
    }
};
