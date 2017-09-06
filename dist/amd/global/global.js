/*can-globals@0.0.5#global/global*/
define([
    'require',
    'exports',
    'module',
    '../can-globals-instance'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var globals = require('../can-globals-instance');
        globals.define('global', function () {
            return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : typeof process === 'object' && {}.toString.call(process) === '[object process]' ? global : window;
        });
        module.exports = globals.makeExport('global');
    }(function () {
        return this;
    }()));
});