/*can-globals@0.0.0-pre.0#js/js*/
define([
    'require',
    'exports',
    'module',
    './global/global',
    './is-browser-window/is-browser-window'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var importMap = {
            global: require('./global/global'),
            isBrowserWindow: require('./is-browser-window/is-browser-window')
        };
        function defineGlobal(g, name) {
            g.define(name, function () {
                return importMap[name];
            });
        }
        module.exports = function (g) {
            for (var name in importMap) {
                if (importMap.hasOwnProperty(name)) {
                    defineGlobal(g, name);
                }
            }
        };
    }(function () {
        return this;
    }()));
});