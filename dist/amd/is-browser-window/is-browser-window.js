/*can-globals@0.2.5#is-browser-window/is-browser-window*/
define([
    'require',
    'exports',
    'module',
    '../can-globals-instance'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var globals = require('../can-globals-instance');
        globals.define('isBrowserWindow', function () {
            return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
        });
        module.exports = globals.makeExport('isBrowserWindow');
    }(function () {
        return this;
    }()));
});