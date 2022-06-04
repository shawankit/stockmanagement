const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllChallanQuery = require('../queries/get-all-challan-query');


const get = async (req) => {

    logInfo('Request to fetch all challan',{});

    const response = await db.find(new GetAllChallanQuery());

    return respond(response,'Successfully Fetched All challans', 'Failed to fetch challans')
}


Route.withOutSecurity().noAuth().get('/challans',get).bind();
