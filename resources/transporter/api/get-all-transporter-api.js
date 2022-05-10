const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllTransporterQuery = require('../queries/get-transporter-query');


const get = async (req) => {

    logInfo('Request to fetch all items',{});

    const response = await db.find(new GetAllTransporterQuery());

    return respond(response,'Successfully Fetched All Transporters', 'Failed to fetch Transporters')
}


Route.withOutSecurity().noAuth().get('/transporters',get).bind();
