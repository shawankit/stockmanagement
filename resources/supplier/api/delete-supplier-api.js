const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteSupplierQuery = require('../queries/delete-supplier-query')


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete supplier',{});

    const response = await db.find(new DeleteSupplierQuery(id));

    return respond(response,'Successfully Deleted supplier', 'Failed to delete supplier')
}


Route.withOutSecurity().noAuth().delete('/suppliers/:id',get).bind();
