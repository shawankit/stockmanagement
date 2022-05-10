const { Transporter } = require("../../../models");

module.exports = class GetAllTransporterQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Transporter.findAll();
    }
}