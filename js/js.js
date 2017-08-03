'use strict';
var importMap = {
	document: require('./document/document'),
	global: require('./global/global'),
	location: require('./location/location'),
	MutationObserver: require('./mutation-observer/mutation-observer')
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
