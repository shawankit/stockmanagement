const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const FindOrCreateSupplierQuery = require('../queries/find-or-create-supplier-query');

const post = async (req) => {
    const { name , address}
     = req.body;

    logInfo('Request to create supplier',name);

    const id = uuid.v4();

    const response = await db.execute(new FindOrCreateSupplierQuery(id,name));

    return respond(response,'Successfully Created supplier', 'Failed to create supplier')
}

Route.withOutSecurity().noAuth().post('/suppliers',post).bind();

