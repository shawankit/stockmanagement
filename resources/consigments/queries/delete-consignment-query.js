const { Consignment } = require('models');

module.exports = class DeleteConsignmentQuery {
    constructor(consignmentId) {
        this.details = {
            consignmentId
        };
    }

    get() {
        return Consignment.destroy({
            where: {
                id: this.details.consignmentId
            }
        });
    }
};
