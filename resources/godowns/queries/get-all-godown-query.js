const { Godown } = require("../../../models");

module.exports = class GetAllGodownsQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Godown.findAll();
    }
}