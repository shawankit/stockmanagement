const { Supplier } = require("../../../models");


module.exports = class UpdateSupplierQuery {
    constructor(id,name){
        this.details = {
            id,
            name
        }
    }

    async get(){
        let supplier = await Supplier.findOne({
            where: {
                id: this.details.id
            }
        });
        if (supplier) {
            const { name } = this.details;
            supplier = Object.assign(supplier, { name });
            return supplier.save();
        }
        return supplier;
    }
}   