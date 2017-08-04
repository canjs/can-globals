/*can-globals@0.0.0-pre#js/is-function/is-function*/
'use strict';
var isFunction = function () {
    if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
        return function (value) {
            return Object.prototype.toString.call(value) === '[object Function]';
        };
    }
    return function (value) {
        return typeof value === 'function';
    };
}();
module.exports = isFunction;