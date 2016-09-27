const stringToHex = require('./convertStringToHex');
const Transform = require('stream').Transform;
const util = require('util');

module.exports = SivaNodeSanitizer;

const ORIGINAL_NODE_HEADER = 'Summary of Original Node';
const MUTATED_NODE_HEADER = 'Summary of Mutated Node';

function SivaNodeSanitizer(options){

  if (!(this instanceof SivaNodeSanitizer)){
    return new SivaNodeSanitizer(options)
  }

  if (! options) options = {};
  options.objectMode = true;
  Transform.call(this, options);

};

util.inherits(SivaNodeSanitizer, Transform);

SivaNodeSanitizer.prototype._transform = function(data, encoding, cb){

  this.push({
  	hex: stringToHex(data[ORIGINAL_NODE_HEADER]),
  	text: data[ORIGINAL_NODE_HEADER],
  	fwding: data[MUTATED_NODE_HEADER],
  	fwding_hex: stringToHex(data[MUTATED_NODE_HEADER])
  }) 

  cb();
}

SivaNodeSanitizer.prototype._flush = function(done){
	done();
}
