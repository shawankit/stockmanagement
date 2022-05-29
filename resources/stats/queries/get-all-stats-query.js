const { Item, Consignment, Godown, sequelize } = require("../../../models");

module.exports = class GetAllStatsQuery {
    constructor(){
        this.details = {}
    }

    async get(){
        const itemCount = await Item.count();
        const [[{consignmentCount}]] = await sequelize.query(`select count(*) as "consignmentCount" from (select count("consignmentNo")
         as conCountfrom from consignments group by "consignmentNo") as t1`);
         const [[{packageCount}]] = await sequelize.query(`SELECT SUM((CASE WHEN "numberOfPackage"~E'^\\\\d+$' THEN "numberOfPackage"::integer ELSE 0 end)) as "packageCount" FROM consignments`);
        const godownCount = await Godown.count();
        return {
            itemCount,
            consignmentCount,
            packageCount,
            godownCount
        }
    }
}