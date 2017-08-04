/*can-globals@0.0.0-pre#js/dev/dev*/
define([
    'require',
    'exports',
    'module',
    '../log/log'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var canLog = require('../log/log');
        module.exports = {
            warnTimeout: 5000,
            logLevel: 0,
            stringify: function (value) {
                var flagUndefined = function flagUndefined(key, value) {
                    return value === undefined ? '/* void(undefined) */' : value;
                };
                return JSON.stringify(value, flagUndefined, '  ').replace(/"\/\* void\(undefined\) \*\/"/g, 'undefined');
            },
            warn: function () {
            },
            log: function () {
            },
            error: function () {
            },
            _logger: canLog._logger
        };
    }(function () {
        return this;
    }()));
});