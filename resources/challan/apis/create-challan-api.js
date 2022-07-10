const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateChallanQuery = require('../queries/create-challan-query');
const GetChallanCountQuery = require('../queries/get-challan-count-for-godown-query');
const GetGodownByIdQuery = require('../../godowns/queries/get-godown-by-id-query');
const UpdateConsignmentLocationService = require('../../consigments/services/update-consignments-location-service');

const getNumber = (challanCount, godown) => {
    const list = godown.name.split(' ');
    let prefix = '';
    if(list.length > 1){
        prefix = (list.reduce((acc, curr) => acc + curr[0], '')).toUpperCase();
    }
    else{
        prefix = (list[0][0] + list[0][1]).toUpperCase();
    }
    return prefix + '/' + (challanCount + 1);
}

const post = async (req) => {
    const { fromGodownId, toGodownId , consigments}
     = req.body;

    logInfo('Request to create challan',{ fromGodownId, toGodownId, consigments});

    const challanId = uuid.v4();

    const getList = (number) => consigments.map((consignmentId) => ({ id:uuid.v4(), fromGodownId, toGodownId, number, consignmentId, challanId }));

    const response = await composeResult(
        (challanCount) => composeResult(
            (number) => db.execute(new CreateChallanQuery(challanId, number, fromGodownId, toGodownId , getList(number))),
            (godown) =>  Result.Ok(getNumber(challanCount,godown)),
            () => db.execute(new GetGodownByIdQuery(fromGodownId)),
        )(),
        () => db.execute(new GetChallanCountQuery(fromGodownId))
    )();

    whenResult(
        () => UpdateConsignmentLocationService.perform(consigments, toGodownId)
    )(response);

    return respond(response,'Successfully Created Challan', 'Failed to create Challan')
}

Route.withOutSecurity().noAuth().post('/challans',post).bind();

