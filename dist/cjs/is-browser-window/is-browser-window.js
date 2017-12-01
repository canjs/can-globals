/*can-globals@0.2.6#is-browser-window/is-browser-window*/
'use strict';
var globals = require('../can-globals-instance.js');
require('../is-node/is-node.js');
globals.define('isBrowserWindow', function () {
    var isNode = globals.getKeyValue('isNode');
    return typeof window !== 'undefined' && typeof document !== 'undefined' && isNode === false;
});
module.exports = globals.makeExport('isBrowserWindow');