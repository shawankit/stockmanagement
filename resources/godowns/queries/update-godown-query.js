const { Godown } = require("../../../models");


module.exports = class UpdateGodownQuery {
    constructor(id,name,address){
        this.details = {
            id,
            name,
            address
        }
    }

    async get(){
        let godown = await Godown.findOne({
            where: {
                id: this.details.id
            }
        });
        if (godown) {
            const { name, address } = this.details;
            godown = Object.assign(godown, { name, address });
            return godown.save();
        }
        return godown;
    }
}   