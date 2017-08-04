/*can-globals@0.0.0-pre#js/is-promise/is-promise*/
define([
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var canReflect = require('can-reflect');
        module.exports = function (obj) {
            return canReflect.isPromise(obj);
        };
    }(function () {
        return this;
    }()));
});