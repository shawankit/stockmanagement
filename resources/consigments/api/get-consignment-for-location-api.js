const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetConsignmentForLocationQuery = require('../queries/get-consignments-for-location-query');


const get = async (req) => {

    const { godownId } = req.params;

    logInfo('Request to fetch all godownId',{});

    const response = await db.find(new GetConsignmentForLocationQuery(godownId));

    return respond(response,'Successfully Fetched All consigments Location', 'Failed to fetch consigments Location')
}


Route.withOutSecurity().noAuth().get('/godowns/:godownId/consigments',get).bind();
