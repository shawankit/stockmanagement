const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateConsignmentLocationQuery = require('../queries/create-consigment-location-query');

const post = async (req) => {
    const { consignmentId }
     = req.params;

    const { godownId, date } = req.body;

    logInfo('Request to create consignmentNo',consignmentId);

    const id = uuid.v4();

    const response = await db.execute(new CreateConsignmentLocationQuery(id,consignmentId,godownId, date));

    return respond(response,'Successfully Created consigments Godowns', 'Failed to create consigments Godowns')
}

Route.withOutSecurity().noAuth().post('/consigments/:consignmentId/godowns',post).bind();

