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

	var hasCjsDependencies = function(deps) {
		return (
			deps[0] === "require" &&
			deps[1] === "exports" &&
			deps[2] === "module"
		);
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
		if (hasCjsDependencies(deps) || (!deps.length && callback.length)) {
			module = { exports: {} };
			args[0] = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args[1] = module.exports;
			args[2] = module;
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
/*can-globals@0.0.0-pre#custom-event-pollyfill*/
define('can-globals@0.0.0-pre#custom-event-pollyfill', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
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
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*can-globals@0.0.0-pre#can-globals-proto*/
define('can-globals/can-globals-proto', [
    'require',
    'exports',
    'module',
    'can-globals/custom-event-pollyfill'
], function (require, exports, module) {
    'use strict';
    require('can-globals/custom-event-pollyfill');
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
        throw key + 'is not defined!';
    };
    Globals.prototype.makeExport = function (key) {
        if (key !== '' && !this.properties[key]) {
            throw key + ' is not defined!';
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
            throw key + ' is not defined!';
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
            throw key + ' is not defined!';
        }
        if (!this.eventHandlers[key]) {
            this.eventHandlers[key] = [];
        }
        this.eventHandlers[key].push(handler);
        return this;
    };
    Globals.prototype.reset = function (key) {
        if (!this.properties[key]) {
            throw key + ' is not defined!';
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
            throw key + ' is not defined!';
        }
        var property = this.properties[key];
        property.value = value;
        this.dispatch('set', key, value);
        return this;
    };
    module.exports = Globals;
});
/*can-globals@0.0.0-pre#js/assign/assign*/
define('can-globals/js/assign/assign', function (require, exports, module) {
    (function (global) {
        module.exports = function (d, s) {
            for (var prop in s) {
                d[prop] = s[prop];
            }
            return d;
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/global/global*/
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
/*can-globals@0.0.0-pre#js/is-array-like/is-array-like*/
define('can-globals/js/is-array-like/is-array-like', function (require, exports, module) {
    'use strict';
    function isArrayLike(obj) {
        var type = typeof obj;
        if (type === 'string') {
            return true;
        } else if (type === 'number') {
            return false;
        }
        var length = obj && type !== 'boolean' && typeof obj !== 'number' && 'length' in obj && obj.length;
        return typeof obj !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
    }
    module.exports = isArrayLike;
});
/*can-globals@0.0.0-pre#js/is-browser-window/is-browser-window*/
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
/*can-globals@0.0.0-pre#js/is-container/is-container*/
define('can-globals/js/is-container/is-container', function (require, exports, module) {
    'use strict';
    module.exports = function (current) {
        return /^f|^o/.test(typeof current);
    };
});
/*can-globals@0.0.0-pre#js/is-empty-object/is-empty-object*/
define('can-globals/js/is-empty-object/is-empty-object', function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function (obj) {
            for (var prop in obj) {
                return false;
            }
            return true;
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/is-function/is-function*/
define('can-globals/js/is-function/is-function', function (require, exports, module) {
    (function (global) {
        'use strict';
        var isFunction = function () {
            if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
                return function (value) {
                    return Object.prototype.toString.call(value) === '[object Function]';
                };
            }
            return function (value) {
                return typeof value === 'function';
            };
        }();
        module.exports = isFunction;
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/is-iterable/is-iterable*/
define('can-globals/js/is-iterable/is-iterable', [
    'require',
    'exports',
    'module',
    'can-symbol'
], function (require, exports, module) {
    'use strict';
    var canSymbol = require('can-symbol');
    module.exports = function (obj) {
        return obj && !!obj[canSymbol.iterator || canSymbol.for('iterator')];
    };
});
/*can-globals@0.0.0-pre#js/is-node/is-node*/
define('can-globals/js/is-node/is-node', function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function () {
            return typeof process === 'object' && {}.toString.call(process) === '[object process]';
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/is-plain-object/is-plain-object*/
define('can-globals/js/is-plain-object/is-plain-object', function (require, exports, module) {
    'use strict';
    var core_hasOwn = Object.prototype.hasOwnProperty;
    function isWindow(obj) {
        return obj !== null && obj == obj.window;
    }
    function isPlainObject(obj) {
        if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj) || obj.constructor && obj.constructor.shortName) {
            return false;
        }
        try {
            if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                return false;
            }
        } catch (e) {
            return false;
        }
        var key;
        for (key in obj) {
        }
        return key === undefined || core_hasOwn.call(obj, key);
    }
    module.exports = isPlainObject;
});
/*can-globals@0.0.0-pre#js/is-promise/is-promise*/
define('can-globals/js/is-promise/is-promise', [
    'require',
    'exports',
    'module',
    'can-reflect'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var canReflect = require('can-reflect');
        module.exports = function (obj) {
            return canReflect.isPromise(obj);
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/is-promise-like/is-promise-like*/
define('can-globals/js/is-promise-like/is-promise-like', function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function (obj) {
            return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/log/log*/
define('can-globals/js/log/log', function (require, exports, module) {
    (function (global) {
        'use strict';
        exports.warnTimeout = 5000;
        exports.logLevel = 0;
        exports.warn = function (out) {
            var ll = this.logLevel;
            if (ll < 2) {
                Array.prototype.unshift.call(arguments, 'WARN:');
                if (typeof console !== 'undefined' && console.warn) {
                    this._logger('warn', Array.prototype.slice.call(arguments));
                } else if (typeof console !== 'undefined' && console.log) {
                    this._logger('log', Array.prototype.slice.call(arguments));
                } else if (window && window.opera && window.opera.postError) {
                    window.opera.postError('CanJS WARNING: ' + out);
                }
            }
        };
        exports.log = function (out) {
            var ll = this.logLevel;
            if (ll < 1) {
                if (typeof console !== 'undefined' && console.log) {
                    Array.prototype.unshift.call(arguments, 'INFO:');
                    this._logger('log', Array.prototype.slice.call(arguments));
                } else if (window && window.opera && window.opera.postError) {
                    window.opera.postError('CanJS INFO: ' + out);
                }
            }
        };
        exports.error = function (out) {
            var ll = this.logLevel;
            if (ll < 1) {
                if (typeof console !== 'undefined' && console.error) {
                    Array.prototype.unshift.call(arguments, 'ERROR:');
                    this._logger('error', Array.prototype.slice.call(arguments));
                } else if (window && window.opera && window.opera.postError) {
                    window.opera.postError('ERROR: ' + out);
                }
            }
        };
        exports._logger = function (type, arr) {
            try {
                console[type].apply(console, arr);
            } catch (e) {
                console[type](arr);
            }
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/dev/dev*/
define('can-globals/js/dev/dev', [
    'require',
    'exports',
    'module',
    'can-globals/js/log/log'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var canLog = require('can-globals/js/log/log');
        module.exports = {
            warnTimeout: 5000,
            logLevel: 0,
            stringify: function (value) {
                var flagUndefined = function flagUndefined(key, value) {
                    return value === undefined ? '/* void(undefined) */' : value;
                };
                return JSON.stringify(value, flagUndefined, '  ').replace(/"\/\* void\(undefined\) \*\/"/g, 'undefined');
            },
            warn: function () {
            },
            log: function () {
            },
            error: function () {
            },
            _logger: canLog._logger
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/is-string/is-string*/
define('can-globals/js/is-string/is-string', [
    'require',
    'exports',
    'module',
    'can-globals/js/dev/dev'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var dev = require('can-globals/js/dev/dev');
        var hasWarned = false;
        module.exports = function isString(obj) {
            return typeof obj === 'string';
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/is-web-worker/is-web-worker*/
define('can-globals/js/is-web-worker/is-web-worker', function (require, exports, module) {
    (function (global) {
        'use strict';
        module.exports = function () {
            return typeof WorkerGlobalScope !== 'undefined' && this instanceof WorkerGlobalScope;
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#js/parse-uri/parse-uri*/
define('can-globals/js/parse-uri/parse-uri', function (require, exports, module) {
    'use strict';
    module.exports = function (url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return m ? {
            href: m[0] || '',
            protocol: m[1] || '',
            authority: m[2] || '',
            host: m[3] || '',
            hostname: m[4] || '',
            port: m[5] || '',
            pathname: m[6] || '',
            search: m[7] || '',
            hash: m[8] || ''
        } : null;
    };
});
/*can-globals@0.0.0-pre#js/js*/
define('can-globals/js/js', [
    'require',
    'exports',
    'module',
    'can-globals/js/assign/assign',
    'can-globals/js/global/global',
    'can-globals/js/is-array-like/is-array-like',
    'can-globals/js/is-browser-window/is-browser-window',
    'can-globals/js/is-container/is-container',
    'can-globals/js/is-empty-object/is-empty-object',
    'can-globals/js/is-function/is-function',
    'can-globals/js/is-iterable/is-iterable',
    'can-globals/js/is-node/is-node',
    'can-globals/js/is-plain-object/is-plain-object',
    'can-globals/js/is-promise/is-promise',
    'can-globals/js/is-promise-like/is-promise-like',
    'can-globals/js/is-string/is-string',
    'can-globals/js/is-web-worker/is-web-worker',
    'can-globals/js/parse-uri/parse-uri'
], function (require, exports, module) {
    (function (global) {
        'use strict';
        var importMap = {
            assign: require('can-globals/js/assign/assign'),
            global: require('can-globals/js/global/global'),
            isArrayLike: require('can-globals/js/is-array-like/is-array-like'),
            isBrowserWindow: require('can-globals/js/is-browser-window/is-browser-window'),
            isContainer: require('can-globals/js/is-container/is-container'),
            isEmptyObject: require('can-globals/js/is-empty-object/is-empty-object'),
            isFunction: require('can-globals/js/is-function/is-function'),
            isIterable: require('can-globals/js/is-iterable/is-iterable'),
            isNode: require('can-globals/js/is-node/is-node'),
            isPlainObject: require('can-globals/js/is-plain-object/is-plain-object'),
            isPromise: require('can-globals/js/is-promise/is-promise'),
            isPromiseLike: require('can-globals/js/is-promise-like/is-promise-like'),
            isString: require('can-globals/js/is-string/is-string'),
            isWebWorker: require('can-globals/js/is-web-worker/is-web-worker'),
            parseURI: require('can-globals/js/parse-uri/parse-uri')
        };
        module.exports = function (g) {
            for (var name in importMap) {
                if (importMap.hasOwnProperty(name)) {
                    (function (g, name) {
                        g.define(name, function () {
                            return importMap[name];
                        });
                    }(g, name));
                }
            }
        };
    }(function () {
        return this;
    }()));
});
/*can-globals@0.0.0-pre#can-globals*/
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