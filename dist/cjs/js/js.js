/*can-globals@0.0.0-pre#js/js*/
'use strict';
var importMap = {
    assign: require('./assign/assign.js'),
    global: require('./global/global.js'),
    isArrayLike: require('./is-array-like/is-array-like.js'),
    isBrowserWindow: require('./is-browser-window/is-browser-window.js'),
    isContainer: require('./is-container/is-container.js'),
    isEmptyObject: require('./is-empty-object/is-empty-object.js'),
    isFunction: require('./is-function/is-function.js'),
    isIterable: require('./is-iterable/is-iterable.js'),
    isNode: require('./is-node/is-node.js'),
    isPlainObject: require('./is-plain-object/is-plain-object.js'),
    isPromise: require('./is-promise/is-promise.js'),
    isPromiseLike: require('./is-promise-like/is-promise-like.js'),
    isString: require('./is-string/is-string.js'),
    isWebWorker: require('./is-web-worker/is-web-worker.js'),
    parseURI: require('./parse-uri/parse-uri.js')
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