/*can-globals@0.2.0#document/document*/
'use strict';
require('../global/global.js');
var globals = require('../can-globals-instance.js');
globals.define('document', function () {
    return globals.getKeyValue('global').document;
});
module.exports = globals.makeExport('document');