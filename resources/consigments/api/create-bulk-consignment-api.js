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
        const { item, privartMark, weight,quantity , rate, itemsList } = packageList[i];
        let request = {
            body: {
                month,entrydate,consignmentNo,transporter,supplier,numberOfPackage: 1,
                billNo,billDate,amountDeclared,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber, godown,
                item, privartMark, weight,quantity , rate
            }
        }
        let result = await CreateConsignmentService.post(request);

        responses.push(result);

        for(let j = 0 ; itemsList && j < itemsList.length ; j++){
            let itemData = itemsList[j]
            request.body = { ...request.body, item: itemData.item, rate: itemData.rate }

            result = await CreateConsignmentService.post(request);

            responses.push(result);
        }
    }

    let response = Result.Ok(responses);

    return respond(response,'Successfully Created Consigment in Bulk', 'Failed to Create Consigment')
}


Route.withOutSecurity().noAuth().post('/consigments/bulk',post).bind();


