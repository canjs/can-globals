/*can-globals@0.2.6#can-globals*/
define([
    'require',
    'exports',
    'module',
    './can-globals-instance',
    './global/global',
    './document/document',
    './location/location',
    './mutation-observer/mutation-observer',
    './is-browser-window/is-browser-window',
    './is-node/is-node'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'use strict';
        var globals = require('./can-globals-instance');
        require('./global/global');
        require('./document/document');
        require('./location/location');
        require('./mutation-observer/mutation-observer');
        require('./is-browser-window/is-browser-window');
        require('./is-node/is-node');
        module.exports = globals;
    }(function () {
        return this;
    }(), require, exports, module));
});