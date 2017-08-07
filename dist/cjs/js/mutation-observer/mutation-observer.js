/*can-globals@0.0.0-pre.3#js/mutation-observer/mutation-observer*/
'use strict';
var global = require('../global/global.js');
var setMutationObserver;
module.exports = function (setMO) {
    if (setMO !== undefined) {
        setMutationObserver = setMO;
    }
    return setMutationObserver !== undefined ? setMutationObserver : global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
};