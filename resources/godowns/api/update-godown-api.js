const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateGodownQuery = require('../queries/update-godown-query');

const post = async (req) => {
    const { name , address}
     = req.body;

     const { id }
     = req.params;

    logInfo('Request to update godown',name);

    const response = await db.execute(new UpdateGodownQuery(id,name,address));

    return respond(response,'Successfully Updated godown', 'Failed to update godown')
}

Route.withOutSecurity().noAuth().put('/godowns/:id',post).bind();

