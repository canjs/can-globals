/*can-globals@0.2.2#can-globals*/
define([
    'require',
    'exports',
    'module',
    './can-globals-instance',
    './global/global',
    './document/document',
    './location/location',
    './mutation-observer/mutation-observer',
    './is-browser-window/is-browser-window'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var globals = require('./can-globals-instance');
        require('./global/global');
        require('./document/document');
        require('./location/location');
        require('./mutation-observer/mutation-observer');
        require('./is-browser-window/is-browser-window');
        module.exports = globals;
    }(function () {
        return this;
    }()));
});