const { Challan, ChallanConsignment } = require("./../../../models");

module.exports = class CreateBulkMediaQuery {
    constructor(id, number = '', godownId, toGodownId, challanConsignments) {
        this.datails = {
            id, number, godownId, toGodownId
        }
        this.challanConsignments = challanConsignments;
    }

    async get() {

        const challan = await Challan.create(this.datails);
        const challanConsignments = await ChallanConsignment.bulkCreate(this.challanConsignments);

        return {
            challan, challanConsignments
        };
    }
};
