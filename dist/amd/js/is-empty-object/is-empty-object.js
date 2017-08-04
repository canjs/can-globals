/*can-globals@0.0.0-pre#js/is-empty-object/is-empty-object*/
define(function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function (obj) {
            for (var prop in obj) {
                return false;
            }
            return true;
        };
    }(function () {
        return this;
    }()));
});