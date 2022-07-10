const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetChallanConsignmentQuery = require('../queries/get-challans-for-consignment-query');


const get = async (req) => {

    const { id } = req.params;

    logInfo('Request to fetch all challan for consignments',{});

    const response = await db.find(new GetChallanConsignmentQuery(id));

    return respond(response,'Successfully Fetched All challans', 'Failed to fetch challans')
}


Route.withOutSecurity().noAuth().get('/consigments/:id/challans',get).bind();
