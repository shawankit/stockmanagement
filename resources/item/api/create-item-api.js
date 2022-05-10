const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateItemQuery = require('../queries/create-item-query');

const post = async (req) => {
    const { name }
     = req.body;

    logInfo('Request to create item',name);

    const itemId = uuid.v4();

    const response = await db.execute(new CreateItemQuery(itemId,name));

    return respond(response,'Successfully Created item', 'Failed to create item')
}

Route.withOutSecurity().noAuth().post('/items',post).bind();

