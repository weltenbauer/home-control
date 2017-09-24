/*
 * brief    Helper definitons for webpack scripts
 * author   Christian Rathemacher (christian@weltenbauer-se.com)
 * company  weltenbauer. Software Entwicklung GmbH
 * date     July 2017
 */

//-----------------------------------------------------------------------------

var path = require('path');
var _root = path.resolve(__dirname, '..');

//-----------------------------------------------------------------------------

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

//-----------------------------------------------------------------------------

exports.root = root;
