/*can-globals@0.0.0-pre#js/is-promise/is-promise*/
'use strict';
var canReflect = require('can-reflect');
module.exports = function (obj) {
    return canReflect.isPromise(obj);
};