/*can-globals@0.2.5#location/location*/
define([
    'require',
    'exports',
    'module',
    '../global/global',
    '../can-globals-instance'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        require('../global/global');
        var globals = require('../can-globals-instance');
        globals.define('location', function () {
            return globals.getKeyValue('global').location;
        });
        module.exports = globals.makeExport('location');
    }(function () {
        return this;
    }()));
});