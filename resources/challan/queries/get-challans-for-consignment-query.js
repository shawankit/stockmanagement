const { Challan, ChallanConsignment, Godown } = require("../../../models");

module.exports = class GetChallanConsignmentQuery {
    constructor(consignmentId){
        this.details = {consignmentId}
    }

    get(){
        return ChallanConsignment.findAll({
            where: this.details,
            include : [
                {
                    model: Godown,
                    as: 'fromGodown'
                },
                {
                    model: Godown,
                    as: 'toGodown'
                },
                {
                    model: Challan,
                    as: 'challan'
                }
            ]
        });
    }
}