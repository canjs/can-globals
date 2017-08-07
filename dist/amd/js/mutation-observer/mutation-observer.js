/*can-globals@0.0.0-pre.3#js/mutation-observer/mutation-observer*/
define([
    'require',
    'exports',
    'module',
    '../global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('../global/global');
        var setMutationObserver;
        module.exports = function (setMO) {
            if (setMO !== undefined) {
                setMutationObserver = setMO;
            }
            return setMutationObserver !== undefined ? setMutationObserver : global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
        };
    }(function () {
        return this;
    }()));
});