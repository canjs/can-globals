/*can-globals@0.2.1#is-browser-window/is-browser-window*/
'use strict';
var globals = require('../can-globals-instance.js');
globals.define('isBrowserWindow', function () {
    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
});
module.exports = globals.makeExport('isBrowserWindow');