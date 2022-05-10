const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllConsignmentsQuery = require('../queries/get-all-consigments-query');


const get = async (req) => {

    logInfo('Request to fetch all users',{});

    const response = await db.find(new GetAllConsignmentsQuery());

    return respond(response,'Successfully Fetched All consigments', 'Failed to fetch consigments')
}


Route.withOutSecurity().noAuth().get('/consigments',get).bind();
