const { ConsigmentLocation } = require("./../../../models");


module.exports = class CreateConsignmentLocationQuery {
    constructor(id,consignmentId,godownId,date){
        this.details = {
            id,
            consignmentId,
            godownId,
            date
        }
    }

    get(){
        return ConsigmentLocation.create({...this.details})
    }
}   