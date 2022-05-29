const { Item } = require('models');

module.exports = class DeleteItemQuery {
    constructor(id) {
        this.details = {
            id
        };
    }

    get() {
        return Item.destroy({
            where: {
                id: this.details.id
            }
        });
    }
};
