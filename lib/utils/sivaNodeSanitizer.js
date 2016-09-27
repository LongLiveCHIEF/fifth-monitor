var stringToHex = require('./convertStringToHex');
const Transform = require('stream').Transform;
const inherits = require('util').inherits;

const ORIGINAL_NODE_HEADER = 'Summary of Original Node';
const MUTATED_NODE_HEADER = 'Summary of Mutated Node';

var sivaNodeSanitizer = function(stream, options){
  Transform.call(this, options);
}

inherits(sivaNodeSanitizer, Transform);

sivaNodeSanitizer.prototype._transform = function(data, encoding, cb){

  this.push(sivaNode(data));
  cb();
}

function sivaNode(data){
  return {
  	hex: stringToHex(data[ORIGINAL_NODE_HEADER]),
  	text: data[ORIGINAL_NODE_HEADER],
  	fwding: data[MUTATED_NODE_HEADER],
  	fwding_hex: stringToHex(data[MUTATED_NODE_HEADER])
  } 
}

module.exports = sivaNodeSanitizer;
