/*can-globals@0.0.0-pre#js/is-string/is-string*/
'use strict';
var dev = require('../dev/dev.js');
var hasWarned = false;
module.exports = function isString(obj) {
    return typeof obj === 'string';
};