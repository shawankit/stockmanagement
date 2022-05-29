const { Item } = require("./../../../models");


module.exports = class UpdateItemQuery {
    constructor(id,name){
        this.details = {
            id,
            name
        }
    }

    async get(){
        let item = await Item.findOne({
            where: {
                id: this.details.id
            }
        });
        if (item) {
            const { name } = this.details;
            item = Object.assign(item, { name });
            return item.save();
        }
        return item;
    }
}   