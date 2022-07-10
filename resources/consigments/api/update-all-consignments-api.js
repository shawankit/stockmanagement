const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllConsignmentsQuery = require('../queries/get-all-consigments-query');
const { post } = require('./update-consignment-api');

const postAll = async (req) => {
   

    logInfo('Request to update all consignments', {});

    const allResponses = [];
    const response = await db.find(new GetAllConsignmentsQuery());

    for(let i = 0 ; i < response.length ; i++){
        const { month,entrydate,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber, godown }
        = response[i];
        let req = {
            body:  { month,entrydate,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber, godown },
            params: {
                id: response[i].id
            }
        }
        const res = await post(req);
        allResponses.push(res);
    }

    return respond(allResponses,'Successfully Updated Consigment All', 'Failed to Update Consigment')
}


Route.withOutSecurity().noAuth().post('/consigments/update/all',postAll).bind();


