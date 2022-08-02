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
            return Consignment.findAndCountAll({
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
                            month: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            entrydate: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            billDate: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            privartMark: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            ewaybillNo: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            deliverydate: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            mrdate: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            amount: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            weight: {
                                [Sequelize.Op.iLike]:  `${this.pattern}%`
                            }
                        },
                        {
                            rate: {
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
                    ]
                }],
                order: [
                    ['entrydate', 'DESC'],
                    //['updatedAt', 'DESC'],
                    ['consignmentNo', 'ASC']
                ],
                offset: this.offset,
                limit: this.limit
            });
        }
        return Consignment.findAndCountAll({
            include : [{
                model: Godown,
                as: 'godowns',
                order: [
                    ['updatedAt', 'DESC']
                ],
            }],
            order: [
                ['entrydate', 'DESC'],
                //['updatedAt', 'DESC'],
                ['consignmentNo', 'ASC']
            ],
            offset: this.offset,
            limit: this.limit
        });
    }
}