/*can-globals@0.0.0-pre#js/is-promise-like/is-promise-like*/
define(function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function (obj) {
            return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
        };
    }(function () {
        return this;
    }()));
});