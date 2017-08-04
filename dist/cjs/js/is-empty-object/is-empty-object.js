/*can-globals@0.0.0-pre#js/is-empty-object/is-empty-object*/
'use strict';
module.exports = function (obj) {
    for (var prop in obj) {
        return false;
    }
    return true;
};