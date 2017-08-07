/*can-globals@0.0.0-pre.2#js/document/document*/
'use strict';
var global = require('../global/global.js');
var setDocument;
module.exports = function (setDoc) {
    if (setDoc) {
        setDocument = setDoc;
    }
    return setDocument || global().document;
};