const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetFilterDataQuery = require('../queries/get-filter-data-query');


const get = async (req) => {

    logInfo('Request to get all filter data',{});

    const response = await db.find(new GetFilterDataQuery());

    return respond(response,'Successfully Fetched All consigments', 'Failed to fetch consigments')
}


Route.withOutSecurity().noAuth().get('/filter-data',get).bind();
