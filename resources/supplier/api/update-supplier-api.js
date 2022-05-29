const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateSupplierQuery = require('../queries/update-supplier-query');

const post = async (req) => {
    const { name }
     = req.body;

    const { id }
     = req.params;

    logInfo('Request to update supplier',{ id, name});

    const response = await db.execute(new UpdateSupplierQuery(id,name));

    return respond(response,'Successfully Updated item', 'Failed to update item')
}

Route.withOutSecurity().noAuth().put('/suppliers/:id',post).bind();

