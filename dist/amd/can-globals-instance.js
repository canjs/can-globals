/*can-globals@0.2.1#can-globals-instance*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    './can-globals-proto'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var namespace = require('can-namespace');
        var Globals = require('./can-globals-proto');
        var globals = new Globals();
        if (namespace.globals) {
            throw new Error('You can\'t have two versions of can-globals, check your dependencies');
        } else {
            module.exports = namespace.globals = globals;
        }
        module.exports = globals;
    }(function () {
        return this;
    }()));
});