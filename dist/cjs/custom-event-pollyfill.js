/*can-globals@0.0.0-pre.2#custom-event-pollyfill*/
'use strict';
var global = require('./js/global/global.js')();
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