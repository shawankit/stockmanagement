const { Challan, ChallanConsignment } = require("../../../models");

module.exports = class GetAllItemsQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Challan.findAll({
            include : [{
                model: ChallanConsignment,
                as: 'challanConsignments'
            }]
        });
    }
}