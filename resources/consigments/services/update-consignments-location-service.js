const { logInfo } = require('lib/functional/logger');
const R = require('ramda');
const db = require('db/repository');
const Result = require('folktale/result');
const UpdateConsignmentLocationQuery = require('../queries/update-consigment-location-query');

module.exports.perform = async(consigments, godownId) => {
    logInfo('update consignmnt location', { consigments, godownId });

    const response = R.map((consignmentId) => db.execute(new UpdateConsignmentLocationQuery(consignmentId, godownId)), consigments);

    return  Result.Ok(await Promise.all(response));
}

module.exports.performReverse = async(challanConsigments) => {
    logInfo('update consignmnt location', { challanConsigments });

    const response = R.map((cc) => db.execute(new UpdateConsignmentLocationQuery(cc.consignmentId, cc.fromGodownId)), challanConsigments);

    return Result.Ok(await Promise.all(response));
}