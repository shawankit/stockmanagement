const { ChallanConsignment, Consignment } = require("../../../models");

module.exports = class GetConsignmentsForChallanQuery {
    constructor(challanId){
        this.details = {challanId}
    }

    async get(){
        const response = await ChallanConsignment.findAll({
            where: this.details
        });

        const consignments = response.map((res) => res.consignmentId);

        return Consignment.findAll({
            where: {
                id: consignments
            }
        });
    }
}