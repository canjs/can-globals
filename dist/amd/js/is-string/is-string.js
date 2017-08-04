/*can-globals@0.0.0-pre#js/is-string/is-string*/
define([
    'require',
    'exports',
    'module',
    '../dev/dev'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var dev = require('../dev/dev');
        var hasWarned = false;
        module.exports = function isString(obj) {
            return typeof obj === 'string';
        };
    }(function () {
        return this;
    }()));
});