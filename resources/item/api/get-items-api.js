const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllItemsQuery = require('../queries/get-all-item-query');


const get = async (req) => {

    logInfo('Request to fetch all items',{});

    const response = await db.find(new GetAllItemsQuery());

    return respond(response,'Successfully Fetched All items', 'Failed to fetch items')
}


Route.withOutSecurity().noAuth().get('/items',get).bind();
