const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetConsignmentQuery = require('../queries/get-consignment-by-id-query');

const get = async (req) => {
    const { consignmentId }
     = req.params;


    logInfo('Request to get consignmentNo',consignmentId);

    const response = await db.execute(new GetConsignmentQuery(consignmentId));

    return respond(response,'Successfully fetch consigment', 'Failed to fetch consigment')
}

Route.withOutSecurity().noAuth().get('/consigments/:consignmentId',get).bind();

