const { Item, Consignment, Godown, sequelize, Supplier } = require("../../../models");

module.exports = class GetFilterDataQuery {
    constructor(){
        this.details = {}
    }

    async get(){
        const consignments = await Consignment.findAll({
            attributes: [
                ['consignmentNo', 'value'],
                sequelize.fn('count', sequelize.col('consignmentNo'))
            ], 
            group: 'consignmentNo'
         });
        const privateMarks = await Consignment.findAll({
            attributes: [
                ['privartMark', 'value'],
                sequelize.fn('count', sequelize.col('privartMark'))
            ],
            group: 'privartMark' });
        const transporters = await Consignment.findAll({ 
            attributes: [
                ['transporter', 'value'],
                sequelize.fn('count', sequelize.col('transporter'))
            ],
            group: 'transporter' });
        const suppliers = await Consignment.findAll({ 
            attributes: [
                ['supplier', 'value'],
                sequelize.fn('count', sequelize.col('supplier'))
            ],
            group: 'supplier' });
        const items = await Consignment.findAll({ 
            attributes: [
                ['item', 'value'],
                sequelize.fn('count', sequelize.col('item'))
            ],
            group: 'item' });

        const godowns = await Godown.findAll({ 
            attributes: [
                'id',
                ['name', 'value']
            ]
         });
        return {
            consignments,
            privateMarks,
            transporters,
            suppliers,
            items,
            godowns
        }
    }
}