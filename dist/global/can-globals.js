/*[global-shim-start]*/
(function(exports, global, doEval){ // jshint ignore:line
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var set = function(name, val){
		var parts = name.split("."),
			cur = global,
			i, part, next;
		for(i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if(!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod){
		if(!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, "default": true };
		for(var p in mod) {
			if(!esProps[p]) return false;
		}
		return true;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		result = module && module.exports ? module.exports : result;
		modules[moduleName] = result;

		// Set global exports
		var globalExport = exports[moduleName];
		if(globalExport && !get(globalExport)) {
			if(useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				doEval(__load.source, global);
			}
		};
	});
}
)({},window,function(__$source__, __$global__) { // jshint ignore:line
	eval("(function() { " + __$source__ + " \n }).call(__$global__);");
}
)
/*can-globals@0.0.0-pre.1#js/global/global*/
define('can-globals/js/global/global', function (require, exports, module) {
    (function (global) {
        'use strict';
        var GLOBAL;
        module.exports = function (setGlobal) {
            if (setGlobal !== undefined) {
                GLOBAL = setGlobal;
            }
            if (GLOBAL) {
                return GLOBAL;
            } else {
                return GLOBAL = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : typeof process === 'object' && {}.toString.call(process) === '[object process]' ? global : window;
            }
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre.1#custom-event-pollyfill*/
define('can-globals/custom-event-pollyfill', [
    'require',
    'exports',
    'module',
    'can-globals/js/global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('can-globals/js/global/global')();
        if (typeof global.CustomEvent !== 'function') {
            if (typeof global.createEvent !== 'function') {
                global.createEvent = function () {
                    return {
                        initCustomEvent: function (event, bubbles, cancelable, detail) {
                            return {
                                type: event,
                                bubbles: bubbles,
                                cancelable: cancelable,
                                detail: detail
                            };
                        }
                    };
                };
            }
            function CustomEvent(event, params) {
                params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: undefined
                };
                var evt = global.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }
            if (typeof global.Event === 'function') {
                CustomEvent.prototype = global.Event.prototype;
            } else {
                var event = global.createEvent('Event');
                CustomEvent.prototype = event.__proto__;
            }
            global.CustomEvent = CustomEvent;
        }
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre.1#can-globals-proto*/
define('can-globals/can-globals-proto', [
    'require',
    'exports',
    'module',
    'can-globals/custom-event-pollyfill'
], function (require, exports, module) {
    'use strict';
    require('can-globals/custom-event-pollyfill');
    function errorMessage(key) {
        return key + ' is not defined!';
    }
    function Globals() {
        this.eventHandlers = {};
        this.properties = {};
    }
    Globals.prototype.define = function (key, value, enableCache) {
        if (!this.properties[key]) {
            this.properties[key] = {
                default: value,
                value: value,
                enableCache: enableCache
            };
        }
        return this;
    };
    Globals.prototype.dispatch = function (name, key, value) {
        var event = new CustomEvent(name, {
            detail: {
                key: key,
                value: value
            }
        });
        this.callHandlers(this.eventHandlers[key], event);
        this.callHandlers(this.eventHandlers[''], event);
    };
    Globals.prototype.callHandlers = function (handlers, event) {
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i](event);
            }
        }
    };
    Globals.prototype.get = function (key) {
        var property = this.properties[key];
        if (property) {
            if (typeof property.value === 'function') {
                if (property.enableCache) {
                    property.value = property.value();
                    return property.value;
                } else {
                    return property.value();
                }
            }
            return property.value;
        }
        throw errorMessage(key);
    };
    Globals.prototype.makeExport = function (key) {
        if (key !== '' && !this.properties[key]) {
            throw errorMessage(key);
        }
        return function (value) {
            if (arguments.length === 0) {
                return this.get(key);
            }
            if (typeof value === 'undefined') {
                this.reset(key);
            } else {
                this.set(key, value);
            }
        }.bind(this);
    };
    Globals.prototype.off = function (key, handler) {
        if (arguments.length === 1) {
            handler = key;
            key = '';
        }
        if (key !== '' && !this.properties[key]) {
            throw errorMessage(key);
        }
        var handlers = this.eventHandlers[key];
        if (handlers) {
            var i = handlers.indexOf(handler);
            handlers.splice(i, 1);
            return this;
        }
    };
    Globals.prototype.on = function (key, handler) {
        if (arguments.length === 1) {
            handler = key;
            key = '';
        }
        if (key !== '' && !this.properties[key]) {
            throw errorMessage(key);
        }
        if (!this.eventHandlers[key]) {
            this.eventHandlers[key] = [];
        }
        this.eventHandlers[key].push(handler);
        return this;
    };
    Globals.prototype.reset = function (key) {
        if (!this.properties[key]) {
            throw errorMessage(key);
        }
        var property = this.properties[key];
        if (property !== undefined) {
            property.value = property.default;
            this.dispatch('reset', key, property.value);
            return this;
        }
    };
    Globals.prototype.set = function (key, value) {
        if (!this.properties[key]) {
            throw errorMessage(key);
        }
        var property = this.properties[key];
        property.value = value;
        this.dispatch('set', key, value);
        return this;
    };
    module.exports = Globals;
});
/*can-globals@0.0.0-pre.1#js/document/document*/
define('can-globals/js/document/document', [
    'require',
    'exports',
    'module',
    'can-globals/js/global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('can-globals/js/global/global');
        var setDocument;
        module.exports = function (setDoc) {
            if (setDoc) {
                setDocument = setDoc;
            }
            return setDocument || global().document;
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre.1#js/is-browser-window/is-browser-window*/
define('can-globals/js/is-browser-window/is-browser-window', function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function () {
            return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre.1#js/location/location*/
define('can-globals/js/location/location', [
    'require',
    'exports',
    'module',
    'can-globals/js/global/global'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var global = require('can-globals/js/global/global');
        var setLocation;
        module.exports = function (setLoc) {
            if (setLoc) {
                setLocation = setLoc;
            }
            return setLocation || global().location;
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre.1#js/js*/
define('can-globals/js/js', [
    'require',
    'exports',
    'module',
    'can-globals/js/document/document',
    'can-globals/js/global/global',
    'can-globals/js/is-browser-window/is-browser-window',
    'can-globals/js/location/location'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var importMap = {
            document: require('can-globals/js/document/document'),
            global: require('can-globals/js/global/global'),
            isBrowserWindow: require('can-globals/js/is-browser-window/is-browser-window'),
            location: require('can-globals/js/location/location')
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
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre.1#can-globals*/
define('can-globals', [
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-globals/can-globals-proto',
    'can-globals/js/js'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var namespace = require('can-namespace');
        var Globals = require('can-globals/can-globals-proto');
        var globals = new Globals();
        require('can-globals/js/js')(globals);
        if (namespace.globals) {
            throw new Error('You can\'t have two versions of can-globals, check your dependencies');
        } else {
            module.exports = namespace.globals = globals;
        }
    }(function () {
        return this;
    }()));
});
/*[global-shim-end]*/
(function(){ // jshint ignore:line
	window._define = window.define;
	window.define = window.define.orig;
}
)();