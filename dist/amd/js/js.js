/*can-globals@0.0.0-pre#js/js*/
define([
    'require',
    'exports',
    'module',
    './assign/assign',
    './global/global',
    './is-array-like/is-array-like',
    './is-browser-window/is-browser-window',
    './is-container/is-container',
    './is-empty-object/is-empty-object',
    './is-function/is-function',
    './is-iterable/is-iterable',
    './is-node/is-node',
    './is-plain-object/is-plain-object',
    './is-promise/is-promise',
    './is-promise-like/is-promise-like',
    './is-string/is-string',
    './is-web-worker/is-web-worker',
    './parse-uri/parse-uri'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var importMap = {
            assign: require('./assign/assign'),
            global: require('./global/global'),
            isArrayLike: require('./is-array-like/is-array-like'),
            isBrowserWindow: require('./is-browser-window/is-browser-window'),
            isContainer: require('./is-container/is-container'),
            isEmptyObject: require('./is-empty-object/is-empty-object'),
            isFunction: require('./is-function/is-function'),
            isIterable: require('./is-iterable/is-iterable'),
            isNode: require('./is-node/is-node'),
            isPlainObject: require('./is-plain-object/is-plain-object'),
            isPromise: require('./is-promise/is-promise'),
            isPromiseLike: require('./is-promise-like/is-promise-like'),
            isString: require('./is-string/is-string'),
            isWebWorker: require('./is-web-worker/is-web-worker'),
            parseURI: require('./parse-uri/parse-uri')
        };
        module.exports = function (g) {
            for (var name in importMap) {
                if (importMap.hasOwnProperty(name)) {
                    (function (g, name) {
                        g.define(name, function () {
                            return importMap[name];
                        });
                    }(g, name));
                }
            }
        };
    }(function () {
        return this;
    }()));
});