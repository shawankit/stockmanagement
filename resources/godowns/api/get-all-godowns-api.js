const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllGodownsQuery = require('../queries/get-all-godown-query');


const get = async (req) => {

    logInfo('Request to fetch all godowns',{});

    const response = await db.find(new GetAllGodownsQuery());

    return respond(response,'Successfully Fetched All godowns', 'Failed to fetch godowns')
}


Route.withOutSecurity().noAuth().get('/godowns',get).bind();
