const { logInfo } = require('lib/functional/logger');
const R = require('ramda');
const db = require('db/repository');
const UpdateConsignmentLocationQuery = require('../queries/update-consigment-location-query');

module.exports.perform = async(consigments, godownId) => {
    logInfo('update consignmnt location', { consigments, godownId });

    const response = R.map((consignmentId) => db.execute(new UpdateConsignmentLocationQuery(consignmentId, godownId)), consigments);

    return Promise.all(response);
}