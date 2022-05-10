const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllStatsQuery = require('../queries/get-all-stats-query');


const get = async (req) => {

    logInfo('Request to fetch all stats',{});

    const response = await db.find(new GetAllStatsQuery());

    return respond(response,'Successfully Fetched All Stats', 'Failed to fetch Stats')
}


Route.withOutSecurity().noAuth().get('/stats',get).bind();
