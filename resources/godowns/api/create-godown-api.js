const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateGodownQuery = require('../queries/create-godown-query');

const post = async (req) => {
    const { name , address}
     = req.body;

    logInfo('Request to create godown',name);

    const godownId = uuid.v4();

    const response = await db.execute(new CreateGodownQuery(godownId,name,address));

    return respond(response,'Successfully Created godown', 'Failed to create godown')
}

Route.withOutSecurity().noAuth().post('/godowns',post).bind();

