const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetConsignmentsForChallanQuery = require('../queries/get-consignments-for-challan-query');


const get = async (req) => {

    const { id } = req.params;

    logInfo('Request to fetch all consignments for challan',{});

    const response = await db.find(new GetConsignmentsForChallanQuery(id));

    return respond(response,'Successfully Fetched All  consignments for challan', 'Failed to fetch  consignments for challan')
}


Route.withOutSecurity().noAuth().get('/challans/:id/consigments',get).bind();
