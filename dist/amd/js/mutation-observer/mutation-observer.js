/*can-globals@0.0.0-pre.2#js/mutation-observer/mutation-observer*/
define([
    'require',
    'exports',
    'module',
    '../../can-globals'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('../../can-globals').get('global');
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