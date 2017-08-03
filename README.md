## API

This module provides a dependency injection container. Modules may `define` a key and specify a default value (which can be static, cached lazy, or dynamic lazy), but other code can `set` and `reset` the value as needed. There is also an event system, for alerting on value changes, both specific to a key and for any key.

### Base Methods

#### define( key, value, cache )
__params__
- _key_ `String` - The key value to create.
- _value_ `Any` || `Function` - The default value. If this is a function, its return value will be used.
- _cache_ `Boolean` (optional) - True to cache the result of the value function.

Defines a new global called `key`, who's value defaults to `value` (if it is not a function), or lazily to the return of `value` (if it is a function). If value is a function and `cache` is truthy, the the value function will only be called once, and that result used for all future calls.

#### get( key )
__params__
- _key_ `String` - The key value to access.

Returns the current value at `key`. If no value has been set, it will return the default value (if it is not a function). If the default value is a function, it will return the output of the function. This execution is cached if the cache flag was set on initialization.

`get`ting a key which was not previously `define`d will result in an error.

#### set ( key, value )
__params__
- _key_ `String` - The key value to access.
- _value_ `Any` - The new value.

Sets the new value at `key`. Will override previously set values, but preserves the default (see `delete`).

`set`ting a key which was not previously `define`d will result in an error.

#### reset( key )
__params__
- _key_ `String` - The key value to access.

Deletes the current value at `key`. Future `get`s will use the default value.

`reset`ting a key which was not previously `define`d will result in an error.

### Event System

#### on ( [ key, ] observer )
__params__
- _key_ `String` - The key value to observe.
- _observer_ `Function` - The observer callback.

Calls `observer` each time the value of `key` is `set` or `reset`. For no key, `observer` will be called each time any value is `set` or `reset`.

`on`ing a key which was not previously `define`d will result in an error. Will not trigger for changes to the return value of lazy defaults.

#### off ( [ key, ] observer )
__params__
- _key_ `String` - The key value to observe.
- _observer_ `Function` - The observer callback.

Removes `observer` from future change events for `key`. For no key, removes `observer` from future change events for all keys (must have called `on` with no key).

`off`ing a key which was not previously `define`d will result in an error. `off`ing an observer which was not previously `on`ed for a key will be silently ignored.

### Helper Methods

#### makeExport( key )
__params__
- _key_ `String` - The key value to access.

Creates an export, for preserving legacy functionality. Returns a function which is `get` (no arguments), `set` (one non-unidentified argument), and `reset` (one unidentified argument).

`makeExport`ing a key which was not previously `define`d will result in an error.

## Use Cases

### Setting Default Properties
```javascript
// Define the global key's default value to the window object
globals.define('global', window);
globals.get('window');
```

### Setting a Lazy Property
```javascript
// To make the value lazy you can set it to a function
globals.define('isBrowserWindow', function() {
  return typeof window !== 'undefined' &&
    typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
});
globals.get('isBrowserWindow'); // will call the provided function every time
```

### Setting a Cached Lazy Property
```javascript
// A third argument of true is passed to enable caching
// The function is called once and the returned value is cached for the next use
globals.define('isWebkit', function() {
  var div = document.createElement('div');
  return 'WebkitTransition' in div.style;
}, true);
globals.get('isWebkit'); // will call the provided function only the first time
```

### Setting a method-like Property
```javascript
// To make the value a method, it must lazily return a function.
globals.define('isRoot', function() {
  return function(pathname) {
    return (pathname || window.location.pathname) === '/';
  };
});

globals.get('isRoot')();
```

### Overwriting/Restoring Properties
```javascript
globals.define('global', window);
globals.set('global', {}); // Overwrite global with an empty object
globals.reset('global'); // Restore to default
globals.get('global') === window;
```
