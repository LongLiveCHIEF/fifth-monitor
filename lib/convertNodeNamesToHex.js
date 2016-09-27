var convertStringToHex = require('./utils/convertStringToHex');
var serviceAccount = require('../google-sheets-service-account.json');
var Sheets = require('node-sheets').default;
var gs = new Sheets('1B8KmXWy0_bTpw_52m5r7-yYJxwfTJS1oyqDn5gKn6rk');
var sivaNodeSanitizer = require('./utils/sivaNodeSanitizer');

//write the output to JSON file
var fs = require('fs');


var writer = fs.createWriteStream('data/sivaNodes.json');
sivaNodeSanitizer(writer);

gs.authorizeJWT(serviceAccount)
  .then(() => gs.tables('A1:Qq'))
  .then( table => {
    table.rows.forEach((row) => {
	  
	  // sanitize the row before writing it
      writer
	    .pipe(sivaNodeSanitizer)
		.write();

    });

    console.log('Convertion completed. Check data/sivaNodes.json');
    writer.end();
  })
  .catch(err => {
    console.error(err);
    writer.end();
  });
