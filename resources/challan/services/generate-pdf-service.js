var pdf = require("pdf-creator-node");
var fs = require("fs");
const Result = require("folktale/result");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

module.exports.perform  = async (data = { 
  billDate: new Date().toLocaleString().split(',')[0],
  number: 'SM/000001',
  billTo: 'Nargis Texttile Private Limited',
  tarnsport: 'TATA 407',
  consignments: []
}) => {

    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'resources/challan/services/template.html'), 'utf8');
    var template = handlebars.compile(templateHtml);
    for (let index = 0; index < 22; index++) {
      data.consignments.push({
        consignmentNo: '',
        privartMark: '',
        item: '',
        numberOfPackage: '',
        quantity: ''
      });
    }
    var html = template(data);

    var milis = new Date();
    milis = milis.getTime();

    var pdfPath = `genrated-pdf/output.pdf`;

    var options = {
      displayHeaderFooter: false,
      margin: {
        top: "20px",
        bottom: "20px",
        right: "20px",
        left: "20px"
      },
      printBackground: true,
      path: pdfPath,
      format: 'a4'
    }

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    });

    var page = await browser.newPage();
    
    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf(options);
    await browser.close();
    return Result.Ok(pdf);
}