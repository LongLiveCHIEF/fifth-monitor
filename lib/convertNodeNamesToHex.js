var serviceAccount = require('../google-sheets-service-account.json');
var Sheets = require('node-sheets').default;
var gs = new Sheets('1B8KmXWy0_bTpw_52m5r7-yYJxwfTJS1oyqDn5gKn6rk');
var fs = require('fs');
var SivaNodeSanitizer = require('./utils/SivaNodeSanitizer');

//write the output to JSON file

var SivaNodeStream = new SivaNodeSanitizer({objectMode: true});

gs.authorizeJWT(serviceAccount)
  .then(() => gs.tables('A1:Qq'))
  .then( table => {
    table.rows.forEach((row) => {
	  
	  // open writer stream
	  SivaNodeStream
	    .write(fs.createWriteStream('data/SivaNodes.json'));

	  // sanitize siva node data
	  SivaNodeStream.pipe(row);

      // close write stream
	  SivaNodeStream.end(()=> {
	 	console.log("siva node data compiled and available at 'data/SivaNodes.json"); 
	  });
    });
	
  })
  .catch(err => {
    console.error(err);
  });
