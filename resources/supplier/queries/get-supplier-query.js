const { Supplier } = require("../../../models");

module.exports = class GetAllSupplierQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Supplier.findAll();
    }
}