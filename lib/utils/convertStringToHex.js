var SYMBOL_HEX_MAP = {
  'T': 'e296bc',
  't': 'e296bc',
  'D': 'e299a6',
  'd': 'e299a6',
  'S': 'e296a0',
  's': 'e296a0',
  'C': 'e2978f',
  'c': 'e2978f',
  ' ': '' //making sure spaces don't break our data
};
module.exports = (string) => {
  var hex = '';
  for (var i = 0; i < string.length; i++) {
    var char = string[i];
    hex += SYMBOL_HEX_MAP[char];
  }
  return hex;
};
