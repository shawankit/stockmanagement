const excel = require('node-excel-export');
const Result = require('folktale/result');
const FieldData = require('../config/FieldData');
const moment = require('moment');
 
const styles = {
  headerDark: {
    font: {
      color: {
        rgb: 'FF000000'
      },
      sz: 12,
      bold: true,
      underline: true
    },
    alignment: {
      horizontal: 'center'
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};

module.exports.perform = async (data, filter) => {

 

  const specification = FieldData.reduce((previous, current, index) => {
      previous[current.name] = {
        displayName: current.label,
        headerStyle: styles.headerDark,
        width: 120,
        index
      }
      return previous;
  }, {});

  const heading = [
    [{value: 'Consignments Report '+ moment().format('DD-MM-YYYY hh:mm:ss'), style: styles.headerDark}],
  ];

  const filterRow = [];
  for(let key in filter){
    if( key == 'fromDate' || key == 'toDate' || key == 'month' ){
      continue;
    }

    if(key == 'privateMark' && filter[key] && filter[key].length > 0){
      filterRow.push({ value:specification['privartMark'].displayName , style: styles.headerDark});
      filterRow.push(filter[key].toString());
      continue;
    }

    if(specification[key] && filter[key] && filter[key].length > 0){
      filterRow.push({ value:specification[key].displayName , style: styles.headerDark});
      filterRow.push(filter[key].toString());
    }
  }

  if(filterRow.length > 0) heading.push(filterRow);

  if((filter.fromDate &&  filter.toDate) || filter.month){
    const dateRow = [];

    if(filter.fromDate && filter.toDate){
      dateRow.push({ value:"Date Range" , style: styles.headerDark});
      dateRow.push(moment(filter['fromDate']).format('DD-MM-YYYY'));
      dateRow.push(moment(filter['toDate']).format('DD-MM-YYYY'));
    }

    if(filter.month){
      dateRow.push({ value:"Month" , style: styles.headerDark});
      dateRow.push(moment(filter['month']).format('MM-YYYY'));
    }
    heading.push(dateRow);
  }

  heading.push([]);

  const dataset = data.rows
 
  const consignmentIndexMap = dataset && dataset.length > 0 ? dataset.reduce((previous, current, currentIndex) => {
      if(!previous[current.consignmentNo]){
          previous[current.consignmentNo] = [];
      }
      previous[current.consignmentNo].push(currentIndex);

      return previous;
  },{}) : {};
  const merges = [{
    start: {
      row: 1,
      column: 1
    },
    end: {
      row: 1,
      column: FieldData.length - 4
    }
  }];
  const colums = ['consignmentNo', 'amount'];
  for (const key in consignmentIndexMap) {
      const element = consignmentIndexMap[key];
      if(element.length > 1){
        for(let i = 0; i < colums.length ; i++){
          merges.push({ 
            start: {
              row: element[0]+ 1 + heading.length + 1,
              column: specification[colums[i]].index + 1
            },
            end: {
              row: element[element.length - 1]+ 1 + heading.length + 1,
              column: specification[colums[i]].index + 1
            } 
          })
        }
      }
  }
  const report = excel.buildExport(
    [ 
      {
        name: 'Report', 
        heading: heading,
        merges: merges,
        specification: specification,
        data: dataset
      }
    ]
  );
  
  
  return Result.Ok(report);
}
 
