/*can-globals@0.0.0-pre#custom-event-pollyfill*/
var loader = require('@loader');
loader.get('@@global-helpers').prepareGlobal({
    require: require,
    name: module.id,
    deps: []
});
var define = loader.global.define;
var require = loader.global.require;
var source = '/* global window, document */\n\'use strict\';\n// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill\n(function () {\n\n  if ( typeof window.CustomEvent === "function" ) return false;\n\n  function CustomEvent ( event, params ) {\n    params = params || { bubbles: false, cancelable: false, detail: undefined };\n    var evt = document.createEvent( \'CustomEvent\' );\n    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );\n    return evt;\n   }\n\n  CustomEvent.prototype = window.Event.prototype;\n\n  window.CustomEvent = CustomEvent;\n})();\n';
loader.global.define = undefined;
loader.global.module = undefined;
loader.global.exports = undefined;
loader.__exec({
    'source': source,
    'address': module.uri
});
loader.global.require = require;
loader.global.define = define;
module.exports = loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);