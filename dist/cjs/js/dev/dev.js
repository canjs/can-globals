/*can-globals@0.0.0-pre#js/dev/dev*/
'use strict';
var canLog = require('../log/log.js');
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