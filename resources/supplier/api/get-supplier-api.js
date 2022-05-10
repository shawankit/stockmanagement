const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllSupplierQuery = require('../queries/get-supplier-query');


const get = async (req) => {

    logInfo('Request to fetch all items',{});

    const response = await db.find(new GetAllSupplierQuery());

    return respond(response,'Successfully Fetched All Suppliers', 'Failed to fetch Suppliers')
}


Route.withOutSecurity().noAuth().get('/suppliers',get).bind();
