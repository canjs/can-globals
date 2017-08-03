'use strict';
var importMap = {
	global: require('./global/global'),
	isBrowserWindow: require('./is-browser-window/is-browser-window')
};

function defineGlobal(g, name){
	g.define(name, function() {
		return importMap[name];
	});
}

module.exports = function(g) {
	for (var name in importMap) {
		if (importMap.hasOwnProperty(name)) {
			defineGlobal(g, name);
		}
	}
};
