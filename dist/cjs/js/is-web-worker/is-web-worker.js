/*can-globals@0.0.0-pre#js/is-web-worker/is-web-worker*/
'use strict';
module.exports = function () {
    return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
};