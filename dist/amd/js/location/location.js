/*can-globals@0.0.0-pre.2#js/location/location*/
define([
    'require',
    'exports',
    'module',
    '../global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('../global/global');
        var setLocation;
        module.exports = function (setLoc) {
            if (setLoc) {
                setLocation = setLoc;
            }
            return setLocation || global().location;
        };
    }(function () {
        return this;
    }()));
});