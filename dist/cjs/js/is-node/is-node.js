/*can-globals@0.0.0-pre#js/is-node/is-node*/
'use strict';
module.exports = function () {
    return typeof process === 'object' && {}.toString.call(process) === '[object process]';
};