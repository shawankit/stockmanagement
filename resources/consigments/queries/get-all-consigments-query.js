const { Consignment, Godown, Sequelize } = require("./../../../models");
const R = require('ramda');
module.exports = class GetAllConsignmentsQuery {
    constructor(pattern, offset = 0, limit = 10){
        this.pattern = pattern
        this.limit = limit;
        this.offset = offset;
    }

    get(){
      
        if(!R.isNil(this.pattern)){
            return Consignment.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        {
                            consignmentNo: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            transporter: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            supplier: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            item: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            billNo: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            mrno: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            challanNumber: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            '$godowns.name$': {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            },
                            '$godowns."ConsigmentLocation"."createdAt"$': {
                                [Sequelize.Op.eq]: Sequelize.literal(`(
                                        select
                                            max(cl."createdAt")
                                        from
                                            "consigmentLocations" as cl
                                        where
                                            cl."consignmentId" = "Consignment".id )`)
                            }
                        },
                    ]
                },
                include : [{
                    model: Godown,
                    as: 'godowns',
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    // where: {
                    //     id: {
                    //         [Sequelize.Op.eq]: Sequelize.literal(`(select
                    //     clc."godownId" as id
                    // from
                    //     "consigmentLocations" as clc
                    // where
                    //     clc."createdAt" = (
                    //     select
                    //         max(cl."createdAt")
                    //     from
                    //         "consigmentLocations" as cl
                    //     where
                    //         cl."consignmentId" = "Consignment".id ))`)
                    //     }
                    // }
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
                as: 'godowns',
                order: [
                    ['updatedAt', 'DESC']
                ],
            }],
            order: [
                ['updatedAt', 'DESC']
            ],
            offset: this.offset
        });
    }
}