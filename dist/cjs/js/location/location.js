/*can-globals@0.0.0-pre.2#js/location/location*/
'use strict';
var global = require('../global/global.js');
var setLocation;
module.exports = function (setLoc) {
    if (setLoc) {
        setLocation = setLoc;
    }
    return setLocation || global().location;
};