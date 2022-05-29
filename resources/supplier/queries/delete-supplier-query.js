const { Supplier } = require('models');

module.exports = class DeleteSupplierQuery {
    constructor(id) {
        this.details = {
            id
        };
    }

    get() {
        return Supplier.destroy({
            where: {
                id: this.details.id
            }
        });
    }
};
