const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GenerateExcelReportService = require('../services/generate-excel-report-service');
const FilterConsignmentsQuery = require('../queries/filter-consignment-query');

const get = async (req) => {
    const {consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown } = req.body;


    logInfo('Request to get report',{});

    const response = await composeResult(
        (data) => GenerateExcelReportService.perform(data),
        () => db.find(new FilterConsignmentsQuery({
                consignmentNo, transporter, supplier, privateMark , fromDate, toDate, item, month, godown
        }, 0, 10, true))
    )();

    return respond(response,'Successfully fetch consigment', 'Failed to fetch consigment')
}

Route.withOutSecurity().noAuth().post('/reports/consigments',get).bind();

