/*can-globals@0.0.0-pre#js/assign/assign*/
define(function (require, exports, module) {
    (function (global) {
        module.exports = function (d, s) {
            for (var prop in s) {
                d[prop] = s[prop];
            }
            return d;
        };
    }(function () {
        return this;
    }()));
});