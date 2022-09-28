const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond, composeResult } = require('lib');
const db = require('db/repository');
const { perform } = require('../services/generate-pdf-service');


const get = async (req) => {

    const { challanId } = req.params;
    logInfo('Request to download challan',{ challanId });

    const response = await perform();

    return respond(response,'Successfully Downloaded challan', 'Failed to download challan')
}


Route.withOutSecurity().noAuth().get('/download-challans/:challanId',get).bind();
