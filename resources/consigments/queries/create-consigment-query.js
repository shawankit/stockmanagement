const { Consignment } = require("./../../../models");


module.exports = class CreateConsigmentQuery {
    constructor(id,month,date,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber){
        this.details = {
            id,
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

    get(){
        return Consignment.create({...this.details})
    }
}