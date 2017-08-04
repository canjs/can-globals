/*can-globals@0.0.0-pre.0#can-globals*/
'use strict';
var namespace = require('can-namespace');
var Globals = require('./can-globals-proto.js');
var globals = new Globals();
require('./js/js.js')(globals);
if (namespace.globals) {
    throw new Error('You can\'t have two versions of can-globals, check your dependencies');
} else {
    module.exports = namespace.globals = globals;
}