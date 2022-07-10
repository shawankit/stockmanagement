const { ConsigmentLocation,Godown } = require("../../../models");
const uuid = require('uuid');

module.exports = class UpdateConsignmentLocationQuery {
    constructor(consignmentId,godownId){
        this.details = {
            consignmentId,
            godownId
        }
    }

    async get(){
        const cl = await ConsigmentLocation.findOne({
            where: {
                consignmentId: this.details.consignmentId
            }
        })
        if(cl){
            cl.godownId = this.details.godownId;
            return cl.save();
        }
        return ConsigmentLocation.create({
            id: uuid.v4(),
            consignmentId: this.details.consignmentId,
            godownId: this.details.godownId
        });
    }
}   