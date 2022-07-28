const { Consignment, Godown, sequelize } = require("./../../../models");
const R = require('ramda');
const { Op } = require("sequelize");
module.exports = class FilterConsignmentsQuery {
    constructor({consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown}, offset = 0, limit = 10){
        this.details = { consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown };
        this.limit = limit;
        this.offset = offset;
    }

    get(){
        const { consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown } = this.details;

        let filter = {};
        if(consignmentNo && consignmentNo.length > 0){
            filter = {...filter, consignmentNo}
        }

        if(transporter && transporter.length > 0){
            filter = {...filter, transporter}
        }

        if(supplier && supplier.length > 0){
            filter = {...filter, supplier}
        }

        if(privateMark && privateMark.length > 0){
            filter = {...filter, privartMark: privateMark}
        }

        if(item && item.length > 0){
            filter = {...filter, item}
        }

        if( (fromDate && toDate) || month ){
            let whereClause = [];
            if(fromDate && toDate){
                whereClause.push(
                    sequelize.where(sequelize.fn('to_date', sequelize.col('entrydate'), 'YYYY-MM-DD'), {
                        [Op.gte]: sequelize.fn('to_date', fromDate, 'YYYY-MM-DD')
                    })
                );
                whereClause.push(
                    sequelize.where(sequelize.fn('to_date', sequelize.col('entrydate'), 'YYYY-MM-DD'), {
                        [Op.lte]: sequelize.fn('to_date', toDate, 'YYYY-MM-DD')
                    })
                );
            }

            if(month){
                whereClause.push(
                    sequelize.where(sequelize.fn('to_date', sequelize.col('entrydate'), 'YYYY-MM-01'), {
                        [Op.eq]: sequelize.fn('to_date', month, 'YYYY-MM-01')
                    })
                );
            }
            filter = {
                [Op.and]: [
                    filter,
                    ...whereClause
                ]
            }
        }

        let includesGodown = {
            model: Godown,
            as: 'godowns',
            order: [
                ['updatedAt', 'DESC']
            ]
        };

        if(godown && godown.length > 0){
            includesGodown = {
                ...includesGodown,
                where: {
                    name: godown
                }
            }
        }

        return Consignment.findAndCountAll({
            where: filter,
            include : [includesGodown],
            order: [
                ['entrydate', 'DESC'],
                ['updatedAt', 'DESC'],
                ['consignmentNo', 'ASC'] 
            ],
            offset: this.offset,
            limit: this.limit
        });
    }
}