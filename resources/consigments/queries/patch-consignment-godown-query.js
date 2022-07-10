const { Consignment } = require('models');

module.exports = class UpdateConsignmentQuery {
    constructor(
        id,godown
    ) {
        this.id = id;
        this.details = {
            godown
        }
    }

    async get() {
        let consignment = await Consignment.findOne({
            where: {
                id: this.id
            }
        });
        if (consignment) {
            consignment.godown = this.details.godown;
            return consignment.save();
        }
        return consignment;
    }
};
