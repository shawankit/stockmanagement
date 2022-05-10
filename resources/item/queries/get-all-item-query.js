const { Item } = require("../../../models");

module.exports = class GetAllItemsQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Item.findAll();
    }
}