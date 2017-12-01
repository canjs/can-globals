/*can-globals@0.2.6#can-globals-instance*/
'use strict';
var namespace = require('can-namespace');
var Globals = require('./can-globals-proto.js');
var globals = new Globals();
if (namespace.globals) {
    throw new Error('You can\'t have two versions of can-globals, check your dependencies');
} else {
    module.exports = namespace.globals = globals;
}