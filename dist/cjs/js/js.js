/*can-globals@0.0.0-pre.3#js/js*/
'use strict';
var importMap = {
    document: require('./document/document.js'),
    global: require('./global/global.js'),
    location: require('./location/location.js'),
    MutationObserver: require('./mutation-observer/mutation-observer.js')
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