/*can-globals@0.0.0-pre.0#js/js*/
'use strict';
var importMap = {
    global: require('./global/global.js'),
    isBrowserWindow: require('./is-browser-window/is-browser-window.js')
};
function defineGlobal(g, name) {
    g.define(name, function () {
        return importMap[name];
    });
}
module.exports = function (g) {
    for (var name in importMap) {
        if (importMap.hasOwnProperty(name)) {
            defineGlobal(g, name);
        }
    }
};