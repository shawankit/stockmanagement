const { Item } = require("./../../../models");


module.exports = class CreateItemQuery {
    constructor(id,name,address){
        this.details = {
            id,
            name
        }
    }

    get(){
        return Item.create({...this.details})
    }
}   