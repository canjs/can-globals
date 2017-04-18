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
