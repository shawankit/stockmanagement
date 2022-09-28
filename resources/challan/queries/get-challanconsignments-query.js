const { ChallanConsignment } = require("../../../models");

module.exports = class GetChallanConsignmentsQuery {
    constructor(challanId){
        this.details = {challanId}
    }

    async get(){
        const response = await ChallanConsignment.findAll({
            where: this.details
        });

        return response
    }
}