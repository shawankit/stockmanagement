const excel = require('node-excel-export');
const Result = require('folktale/result');
const FieldData = require('../config/FieldData');
 
// You can define styles as json object
const styles = {
  headerDark: {
    font: {
      color: {
        rgb: 'FF000000'
      },
      sz: 12,
      bold: true,
      underline: true
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

module.exports.perform = async (data) => {

  const heading = [
    [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
    ['a2', 'b2', 'c2']
  ];

  const specification = FieldData.reduce((previous, current) => {
      previous[current.name] = {
        displayName: current.label,
        headerStyle: styles.headerDark,
        width: 120
      }
      return previous;
  }, {})
  
  const dataset = data.rows
  const merges = []
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
 
