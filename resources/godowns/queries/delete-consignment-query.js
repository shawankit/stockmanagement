const { Godown } = require('models');

module.exports = class DeleteConsignmentQuery {
    constructor(id) {
        this.details = {
            id
        };
    }

    get() {
        return Godown.destroy({
            where: {
                id: this.details.id
            }
        });
    }
};
