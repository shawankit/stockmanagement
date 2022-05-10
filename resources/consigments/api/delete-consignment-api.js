const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteConsignmentQuery = require('../queries/delete-consignment-query')


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete consignment',{});

    const response = await db.find(new DeleteConsignmentQuery(id));

    return respond(response,'Successfully Deleted consigment', 'Failed to delete consigment')
}


Route.withOutSecurity().noAuth().delete('/consigments/:id',get).bind();
