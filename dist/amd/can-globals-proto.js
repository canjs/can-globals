/*can-globals@0.0.0-pre#can-globals-proto*/
define([
    'require',
    'exports',
    'module',
    './custom-event-pollyfill'
], function (require, exports, module) {
    'use strict';
    require('./custom-event-pollyfill');
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