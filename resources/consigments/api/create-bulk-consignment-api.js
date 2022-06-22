const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateConsignmentService = require('./create-consignment-api');

const post = async (req) => {
    const { packageList, month,entrydate,consignmentNo,transporter,supplier,numberOfPackage,billNo,billDate,amountDeclared,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber, godown }
     = req.body;

    logInfo('Request to create bulk consignments', {});
    let responses = [];

    for(let i = 0 ; i < packageList.length ; i++){
        const { item, privateMark, weight,quantity , rate } = packageList[i];
        const request = {
            body: {
                month,entrydate,consignmentNo,transporter,supplier,numberOfPackage: 1,
                billNo,billDate,amountDeclared,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber, godown,
                item, privateMark, weight,quantity , rate
            }
        }
        const result = await CreateConsignmentService.post(request)

        responses.push(result);
    }

    let response = Result.Ok(responses);

    return respond(response,'Successfully Created Consigment in Bulk', 'Failed to Create Consigment')
}


Route.withOutSecurity().noAuth().post('/consigments/bulk',post).bind();


