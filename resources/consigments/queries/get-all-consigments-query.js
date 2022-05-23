const { Consignment, Godown, Sequelize } = require("./../../../models");
const R = require('ramda');
module.exports = class GetAllConsignmentsQuery {
    constructor(consignmentNo, offset = 0, limit = 10){
        this.consignmentNo = consignmentNo
        this.limit = limit;
        this.offset = offset;
    }

    get(){
      
        if(!R.isNil(this.consignmentNo)){
            console.log(this.consignmentNo);
            return Consignment.findAll({
                where: {
                    consignmentNo: {
                        [Sequelize.Op.iLike]:  `${this.consignmentNo}%`
                    }
                },
                include : [{
                    model: Godown,
                    as: 'godowns'
                }],
                order: [
                    ['updatedAt', 'DESC']
                ],
                offset: this.offset
            });
        }
        return Consignment.findAll({
            include : [{
                model: Godown,
                as: 'godowns'
            }],
            order: [
                ['updatedAt', 'DESC']
            ],
            offset: this.offset
        });
    }
}