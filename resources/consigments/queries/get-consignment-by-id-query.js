const { Consignment, Godown } = require("../../../models");

module.exports = class GetConsignmentQuery {
    constructor(id){
        this.details = {id}
    }

    get(){
        return Consignment.findOne({
            where: this.details,
            include : [{
                model: Godown,
                as: 'godowns'
            }]
        }); 
    }
}