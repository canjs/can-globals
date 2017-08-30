/*can-globals@0.0.4#mutation-observer/mutation-observer*/
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
        globals.define('MutationObserver', function () {
            var GLOBAL = globals.getKeyValue('global');
            return GLOBAL.MutationObserver || GLOBAL.WebKitMutationObserver || GLOBAL.MozMutationObserver;
        });
        module.exports = globals.makeExport('MutationObserver');
    }(function () {
        return this;
    }()));
});