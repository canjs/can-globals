/*can-globals@0.0.4#location/location*/
'use strict';
require('../global/global.js');
var globals = require('../can-globals-instance.js');
globals.define('location', function () {
    return globals.getKeyValue('global').location;
});
module.exports = globals.makeExport('location');