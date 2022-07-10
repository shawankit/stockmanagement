const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const FilterConsignmentsQuery = require('../queries/filter-consignment-query');


const get = async (req) => {

    const {consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown } = req.body;

    logInfo('Request to fetch all users',{consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown });

    const response = await db.find(new FilterConsignmentsQuery({
         consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown
    }));

    return respond(response,'Successfully filter All consigments', 'Failed to filter consigments')
}


Route.withOutSecurity().noAuth().post('/consigments/filter',get).bind();
