/*can-globals@0.0.6#global/global*/
'use strict';
var globals = require('../can-globals-instance.js');
globals.define('global', function () {
    return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : typeof process === 'object' && {}.toString.call(process) === '[object process]' ? global : window;
});
module.exports = globals.makeExport('global');