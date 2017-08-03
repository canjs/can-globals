'use strict';
var stealTools = require("steal-tools");

stealTools.export({
	steal: {
		config: __dirname + "/package.json!npm"
	},
	outputs: {
		"+cjs": {},
		"+amd": {},
		"+global-js": {}
	}
}).catch(function(e){
	console.error(e);
	process.exit(e && e.code || 1);	
});
