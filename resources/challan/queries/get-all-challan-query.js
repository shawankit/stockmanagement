const { Challan, ChallanConsignment, Godown } = require("../../../models");

module.exports = class GetAllItemsQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Challan.findAll({
            include : [
                {
                    model: Godown,
                    as: 'godown'
                },
                {
                    model: Godown,
                    as: 'toGodown'
                },
                {
                    model: ChallanConsignment,
                    as: 'challanConsignments'
                }
            ]
        });
    }
}