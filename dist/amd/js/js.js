/*can-globals@0.0.0-pre.1#js/js*/
define([
    'require',
    'exports',
    'module',
    './document/document',
    './global/global',
    './is-browser-window/is-browser-window',
    './location/location'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var importMap = {
            document: require('./document/document'),
            global: require('./global/global'),
            isBrowserWindow: require('./is-browser-window/is-browser-window'),
            location: require('./location/location')
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