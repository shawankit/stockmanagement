const { ConsigmentLocation, Consignment, Godown } = require("../../../models");

module.exports = class  GetConsignmentForLocationQuery{
    constructor(godownId){
        this.details = {godownId}
    }

    get(){
        return ConsigmentLocation.findAll({
            where: this.details,
            include : [{
                model: Godown,
                as: 'godowns'
            },
            {
                model: Consignment,
                as: 'consignments'
            }
        ]
        }); 
    }
}