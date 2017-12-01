/*can-globals@0.2.6#is-node/is-node*/
'use strict';
var globals = require('../can-globals-instance.js');
globals.define('isNode', function () {
    return typeof process === 'object' && {}.toString.call(process) === '[object process]';
});
module.exports = globals.makeExport('isNode');