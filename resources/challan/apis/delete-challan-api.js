const Route = require('route');
const db = require('db/repository');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const UpdateConsignmentLocationService = require('../../consigments/services/update-consignments-location-service');
const GetChallanConsignmentsQuery = require('../queries/get-challanconsignments-query');
const DeleteChallanConsignmentsQuery = require('../queries/delete-challanconsignments-query');
const DeleteChallanQuery = require('../queries/delete-challan-query');


const post = async (req) => {
    const { id }
     = req.params;

    logInfo('Request to delete challan',{ id });

    const response = await composeResult(
        (challanConsignments) => composeResult(
            () => db.execute(new DeleteChallanQuery(id)),
            () => db.execute(new DeleteChallanConsignmentsQuery(challanConsignments.map((cc) => cc.id))),
            () => UpdateConsignmentLocationService.performReverse(challanConsignments)
        )(),
        () => db.execute(new GetChallanConsignmentsQuery(id))
    )();

    return respond(response,'Successfully Delete Challan', 'Failed to delete Challan')
}

Route.withOutSecurity().noAuth().delete('/challans/:id',post).bind();

