const { ChallanConsignment } = require("../../../models");

module.exports = class DeleteChallanConsignmentsQuery {
    constructor(ids){
        this.details = {ids}
    }

    async get(){
        const response = await ChallanConsignment.destroy({
            where: {
                id : this.details.ids
            }
        });

        return response
    }
}