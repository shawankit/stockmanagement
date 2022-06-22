const { Consignment } = require("./../../../models");


module.exports = class CreateConsigmentQuery {
    constructor(id,month,entrydate,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber,godown){
        this.details = {
            id,
            month,
            entrydate,
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
            challanNumber,
            godown
        }
    }

    get(){
        return Consignment.create({...this.details})
    }
}