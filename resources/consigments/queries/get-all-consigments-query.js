const { Consignment, Godown } = require("./../../../models");

module.exports = class GetAllConsignmentsQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Consignment.findAll({
            include : [{
                model: Godown,
                as: 'godowns'
            }]
        });
    }
}