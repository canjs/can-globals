/*can-globals@0.2.6#can-globals*/
'use strict';
var globals = require('./can-globals-instance.js');
require('./global/global.js');
require('./document/document.js');
require('./location/location.js');
require('./mutation-observer/mutation-observer.js');
require('./is-browser-window/is-browser-window.js');
require('./is-node/is-node.js');
module.exports = globals;