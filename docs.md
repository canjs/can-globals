## API

### globals.initialize( key, value, cache )
__params__
- _key_ `String` - The key value to create.
- _value_ `Any` || `Function` - The default value. If this is a function, its return value will be used.
- _cache_ `Boolean` (optional) - True to cache the result of the value function.

Initialized a new global called `key`, who's value defaults to `value` (if it is not a function), or lazily to the return of `value` (if it is a function).

### get key
- _key_ `String` - The key value to access.

Returns the current value at `key`. If no value has been set, it will return the default value (if it is not a function). If the default value is a function, it will return the output of the function. This execution is cached if the cache flag was set on initialization.

### set key ( value )
- _key_ `String` - The key value to access.
- _value_ `Any` - The new value.

Sets the new value at `key`. Will override previously set values, but preserves the default (see `delete`).

### delete key
- _key_ `String` - The key value to access.

Deletes the current value at `key`. Future `get`s will use the default value.

### globals.makeExport( key )
__params__
- _key_ `String` - The key value to access.

Creates an export, for preserving legacy functionality. Returns a function which is both a getter (no arguments) and a setter (one argument).

## Use Cases

### Setting Default Properties
```javascript
const globals = require('can-globals');
// Set the global key's default value to the window object
globals.initialize('global', window);
```

### Setting a dynamic Property
```javascript
const globals = require('can-globals');
// To make the value dynamic you can set it to a function
globals.initialize("isRoot", function() {
  return window.location.pathname === "/";
});
```

### Cached dynamic Property
```javascript
const globals = require('can-globals');
// A third argument of true is passed to enable caching
// The function is called once and the returned value is cached for the next use
globals.initialize("isWebkit", function() {
  var div = document.createElement("div");
  return "WebkitTransition" in div.style;
}, true);
```

### Setting a method-like Property
```javascript
const globals = require('can-globals');

globals.initialize("isBrowserWindow", function() {
  return function(w) {
    return typeof window !== "undefined" &&
      typeof document !== "undefined" && typeof SimpleDOM === "undefined";
  };
});
```

### Overwriting/Restoring Properties
```javascript
const globals = require('can-globals');

globals.initialize('global', window);
// Overwrite global with an empty object
globals.global = {};
// Restore to default
delete globals.global;
```