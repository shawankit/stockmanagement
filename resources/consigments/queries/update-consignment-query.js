const { Consignment } = require('models');

module.exports = class UpdateConsignmentQuery {
    constructor(
        id,month,date,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber
    ) {
        this.id = id;
        this.details = {
            month,
            date,
            consignmentNo,
            transporter,
            supplier,
            privartMark,
            numberOfPackage,
            weight,
            quantity,
            item,
            billNo,
            billDate,
            amountDeclared,
            rate,
            ewaybillNo,
            mrno,
            mrdate,
            amount,
            deliverydate,
            challanNumber
        }
    }

    async get() {
        let consignment = await Consignment.findOne({
            where: {
                id: this.id
            }
        });
        if (consignment) {
            consignment = Object.assign(consignment, this.details);
            return consignment.save();
        }
        return consignment;
    }
};
