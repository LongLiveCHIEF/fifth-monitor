var serviceAccount = require('../google-sheets-service-account.json');
var Sheets = require('node-sheets').default;
var gs = new Sheets('1B8KmXWy0_bTpw_52m5r7-yYJxwfTJS1oyqDn5gKn6rk');
var fs = require('fs');
var SivaNodeSanitizer = require('./utils/SivaNodeSanitizer');

var writer = fs.createWriteStream('data/SivaNodes.json');
var SivaNodeSanitizer = new SivaNodeSanitizer();

SivaNodeSanitizer.pipe(writer, {end: false});

function closeSivaSanitizer(){
  return SivaNodeSanitizer.end(function(){
    console.log("siva node data compiled and available at 'data/SivaNodes.json"); 
  });
}

gs.authorizeJWT(serviceAccount)
  .then(() => gs.tables('A1:Qq'))
  .then( table => {
    table.rows.forEach((row) => SivaNodeSanitizer.write(row));
  })
  .then(closeSivaSanitizer)
  .catch(err => {
    console.error(err);
  })
