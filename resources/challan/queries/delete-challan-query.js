const { Challan } = require("../../../models");

module.exports = class DeleteChallanQuery {
    constructor(id){
        this.details = {id}
    }

    async get(){
        const response = await Challan.destroy({
            where: {
                id : this.details.id
            }
        });

        return response
    }
}