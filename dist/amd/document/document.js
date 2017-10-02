/*can-globals@0.2.2#document/document*/
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
        globals.define('document', function () {
            return globals.getKeyValue('global').document;
        });
        module.exports = globals.makeExport('document');
    }(function () {
        return this;
    }()));
});