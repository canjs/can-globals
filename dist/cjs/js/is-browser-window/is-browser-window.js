/*can-globals@0.0.0-pre#js/is-browser-window/is-browser-window*/
'use strict';
module.exports = function () {
    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
};