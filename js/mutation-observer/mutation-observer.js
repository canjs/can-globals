'use strict';

var global = require('can-globals').get('global');
var setMutationObserver;
module.exports = function(setMO){
	if(setMO !== undefined) {
		setMutationObserver = setMO;
	}
	return setMutationObserver !== undefined ? setMutationObserver :
		global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver;
};
