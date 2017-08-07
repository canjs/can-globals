/*can-globals@0.0.0-pre.3#js/document/document*/
define([
    'require',
    'exports',
    'module',
    '../global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('../global/global');
        var setDocument;
        module.exports = function (setDoc) {
            if (setDoc) {
                setDocument = setDoc;
            }
            return setDocument || global().document;
        };
    }(function () {
        return this;
    }()));
});