const { ConsigmentLocation,Godown } = require("./../../../models");


module.exports = class CreateConsignmentLocationQuery {
    constructor(id,consignmentId,godown,date){
        this.details = {
            id,
            consignmentId,
            godown,
            date
        }
    }

    async get(){

        const godown = await Godown.findOne({
            where: {
                name : this.details.godown
            }
        });

        if(godown){
            const cl = await ConsigmentLocation.findOne({
                where: {
                    consignmentId: this.details.consignmentId
                }
            })
            if(cl){
                cl.godownId = godown.id;
                return cl.save();
            }
            return ConsigmentLocation.create({
                id: this.details.id,
                consignmentId: this.details.consignmentId,
                godownId: godown.id
            })
        }
        
        return null;
    }
}   