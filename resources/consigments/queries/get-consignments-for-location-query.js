const { ConsigmentLocation, Consignment, Godown } = require("../../../models");

module.exports = class  GetConsignmentForLocationQuery{
    constructor(godownId){
        this.details = {godownId}
    }

    async get(){
        const result = await ConsigmentLocation.findAll({
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

        return result.filter((data) => data.consignments != null);
    }
}