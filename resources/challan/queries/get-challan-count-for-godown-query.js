const { Challan, ChallanConsignment, Godown } = require("../../../models");

module.exports = class GetChallanCountQuery {
    constructor(godownId){
        this.details = {godownId}
    }

    get(){
        return Challan.count({
            where: this.details
        });
    }
}