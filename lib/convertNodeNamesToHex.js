var convertStringToHex = require('./utils/convertStringToHex');
var serviceAccount = require('../google-sheets-service-account.json');
var Sheets = require('node-sheets').default;
var gs = new Sheets('1B8KmXWy0_bTpw_52m5r7-yYJxwfTJS1oyqDn5gKn6rk');

//write the output to CSV file
var fs = require('fs');
var csvWriter = require('csv-write-stream')

const ORIGINAL_NODE_HEADER = 'Summary of Original Node';
const MUTATED_NODE_HEADER = 'Summary of Mutated Node';
var writer = csvWriter({ headers: ['Original Node', 'Original Node in HEX', 'Mutated Node', 'Mutated Node in HEX']});
writer.pipe(fs.createWriteStream('data/node-names-hex.csv'));

gs.authorizeJWT(serviceAccount)
  .then(() => gs.tables('A1:Qq'))
  .then( table => {
    table.rows.forEach((row) => {
      var originalNode = row[ORIGINAL_NODE_HEADER].stringValue;
      var mutatedNode = row[MUTATED_NODE_HEADER].stringValue;
      writer.write([
        originalNode,
        convertStringToHex(originalNode),
        mutatedNode,
        convertStringToHex(mutatedNode)
      ]);
    });
    console.log('Convertion completed. Check data/node-names-hex.csv');
    writer.end();
  })
  .catch(err => {
    console.error(err);
    writer.end();
  });
