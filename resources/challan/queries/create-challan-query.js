const { Challan, ChallanConsignment } = require("./../../../models");

module.exports = class CreateBulkMediaQuery {
    constructor(id, number, godownId, challanConsignments) {
        this.datails = {
            id, number, godownId
        }
        this.challanConsignments = challanConsignments;
    }

    async get() {

        const challan = await Challan.create(this.datails);
        const challanConsignments = await ChallanConsignment.bulkCreate(this.challanConsignments, { individualHooks: true });

        return {
            challan, challanConsignments
        }
    }
};
