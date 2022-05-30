const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateChallanQuery = require('../queries/create-challan-query');

const post = async (req) => {
    const { number, godownId , consignments}
     = req.body;

    logInfo('Request to create challan',{ godownId, consignments});

    const challanId = uuid.v4();

    const list = consignments.map((consignmentId) => ({ id:uuid.v4(), godownId, number, consignmentId, challanId }));

    const response = await db.execute(new CreateChallanQuery(challanId, number, godownId, list));

    return respond(response,'Successfully Created Challan', 'Failed to create Challan')
}

Route.withOutSecurity().noAuth().post('/challans',post).bind();

