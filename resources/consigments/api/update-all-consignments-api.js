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

    
    const response = await db.find(new GetAllConsignmentsQuery());

    const responses = await whenResult(
        async(list) => {
            const allResponses = [];
            for(let i = 0 ; i < list.length ; i++){
                const { month,entrydate,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber, godown }
                = list[i];
                let req = {
                    body:  { month,entrydate,consignmentNo,transporter,supplier,privartMark,numberOfPackage,weight,quantity,item,billNo,billDate,amountDeclared,rate,ewaybillNo,mrno,mrdate,amount,deliverydate,challanNumber, godown },
                    params: {
                        id: list[i].id
                    }
                }
                const res = await post(req);
                allResponses.push(res);
            }
            return Result.Ok(allResponses);
        }
    )(response);
    
    return respond(responses,'Successfully Updated Consigment All', 'Failed to Update Consigment')
}


Route.withOutSecurity().noAuth().post('/consigments/update/all',postAll).bind();


