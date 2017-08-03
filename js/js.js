'use strict';
var importMap = {
	assign: require('./assign/assign'),
	global: require('./global/global'),
	isArrayLike: require('./is-array-like/is-array-like'),
	isBrowserWindow: require('./is-browser-window/is-browser-window'),
	isContainer: require('./is-container/is-container'),
	isEmptyObject: require('./is-empty-object/is-empty-object'),
	isFunction: require('./is-function/is-function'),
	isIterable: require('./is-iterable/is-iterable'),
	isNode: require('./is-node/is-node'),
	isPlainObject: require('./is-plain-object/is-plain-object'),
	isPromise: require('./is-promise/is-promise'),
	isPromiseLike: require('./is-promise-like/is-promise-like'),
	isString: require('./is-string/is-string'),
	isWebWorker: require('./is-web-worker/is-web-worker'),
	parseURI: require('./parse-uri/parse-uri')
};

module.exports = function(g) {
	for (var name in importMap) {
		if (importMap.hasOwnProperty(name)) {
			(function(g, name){
				g.define(name, function() {
					return importMap[name];
				});
			})(g, name);
		}
	}
};
