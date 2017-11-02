/*can-globals@0.2.4#mutation-observer/mutation-observer*/
'use strict';
require('../global/global.js');
var globals = require('../can-globals-instance.js');
globals.define('MutationObserver', function () {
    var GLOBAL = globals.getKeyValue('global');
    return GLOBAL.MutationObserver || GLOBAL.WebKitMutationObserver || GLOBAL.MozMutationObserver;
});
module.exports = globals.makeExport('MutationObserver');