const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateConsigmentQuery = require('../queries/create-consigment-query');
const FindOrCreateTransporterQuery = require('../../transporter/queries/find-or-create-transporter-query');
const FindOrCreateSupplierQuery = require('../../supplier/queries/find-or-create-supplier-query');
const FindOrCreateItemQuery = require('../../item/queries/find-or-create-item-query');

const dbExecute = async (value,fn) => R.ifElse(
    () => !R.isNil(value),
    () => fn(),
    () => Result.Ok([])
)();

const post = async (req) => {
    const { month,date,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber }
     = req.body;

    logInfo('Request to create consignmentNo',consignmentNo);

    const consignmentId = uuid.v4();

    const transporterId = uuid.v4();

    const supplierId = uuid.v4();

    const itemId = uuid.v4();

    const response = await composeResult(
        () => db.execute(new CreateConsigmentQuery(consignmentId,month,date,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber)),
        () => dbExecute(transporter, () => db.execute(new FindOrCreateTransporterQuery(transporterId,transporter))),
        () => dbExecute(supplier, () => db.execute(new FindOrCreateSupplierQuery(supplierId,supplier))),
        () => dbExecute(item, () => db.execute(new FindOrCreateItemQuery(itemId,item)))
    )();

    return respond(response,'Successfully Created Consigment', 'Failed to Create Consigment')
}


Route.withOutSecurity().noAuth().post('/consigments',post).bind();
