const { Godown } = require("./../../../models");


module.exports = class CreateGodownQuery {
    constructor(id,name,address){
        this.details = {
            id,
            name,
            address
        }
    }

    get(){
        return Godown.create({...this.details})
    }
}   