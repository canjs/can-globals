/*can-globals@0.2.6#location/location*/
define([
    'require',
    'exports',
    'module',
    '../global/global',
    '../can-globals-instance'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        require('../global/global');
        var globals = require('../can-globals-instance');
        globals.define('location', function () {
            return globals.getKeyValue('global').location;
        });
        module.exports = globals.makeExport('location');
    }(function () {
        return this;
    }(), require, exports, module));
});