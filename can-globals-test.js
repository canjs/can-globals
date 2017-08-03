'use strict';
var Globals = require('./can-globals-proto');
var QUnit = require('./test-wrapper');
var sinon = require('sinon');
var globals;

function mapEvents(spy){
	return spy.args.reduce(function(acc, cur) {
		return acc.concat(cur[0]);
	},  []);
}

function loop(fn, count, ctx){
	for(var i = count; i > 0; i--){
		if(ctx){
			fn.call(ctx, i);
			continue;
		}
		fn(i);
	}
}

QUnit.module('can-globals/can-globals-proto');

QUnit.test('get undefined property', function() {
	globals = new Globals();
	try{
		globals.getKeyValue('test');
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('set undefined property', function() {
	globals = new Globals();
	try{
		globals.setKeyValue('test');
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('reset undefined property', function() {
	globals = new Globals();
	try{
		globals.deleteKeyValue('test');
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('on undefined property', function() {
	globals = new Globals();
	try{
		globals.onKeyValue('test', function() {});
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('off undefined property', function() {
	globals = new Globals();
	try{
		globals.offKeyValue('test', function() {});
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('makeExport undefined property', function() {
	globals = new Globals();
	try{
		globals.makeExport('test');
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('define with cache disabled', function() {
	var getter = sinon.spy();
	globals = new Globals();
	globals.define('foo', getter, false);
	loop(function(){
		globals.getKeyValue('foo');
	}, 5);
	equal(getter.callCount, 5);
});

QUnit.test('define cache enabled', function() {
	var getter = sinon.spy();
	globals = new Globals();
	globals.define('foo', getter);
	loop(function(){
		globals.getKeyValue('foo');
	}, 5);
	equal(getter.calledOnce, true);
});

QUnit.test('define and get a new property', function() {
	globals = new Globals();
	globals.define('test', 'default');
	equal(globals.getKeyValue('test'), 'default');
});

QUnit.test('set existing property to string', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', 'updated');
	equal(globals.getKeyValue('test'), 'updated');
});

QUnit.test('set existing property to undefined', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', undefined);
	equal(globals.getKeyValue('test'), undefined);
});

QUnit.test('set existing property to a function', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', function(){
		return 'foo';
	});
	equal(globals.getKeyValue('test'), 'foo');
});

QUnit.test('reset property to default', function() {
	var globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', 'updated');
	globals.deleteKeyValue('test');
	equal(globals.getKeyValue('test'), 'default');
});

QUnit.test('listen for key change', function() {
	var globals = new Globals();
	var handler = sinon.spy();
	globals.define('test', 'default');
	globals.define('foo', 'bar');
	globals.onKeyValue('test', handler);
	globals.setKeyValue('test', 'updated');
	globals.setKeyValue('foo', 'baz');
	globals.deleteKeyValue('test');
	equal(handler.callCount, 2);
	deepEqual(mapEvents(handler), [
		'updated',
		'default'
	]);
});

QUnit.test('remove event listener for key', function() {
	var globals = new Globals();
	var handler = sinon.spy();
	globals.define('test', 'foo');
	globals.onKeyValue('test', handler);
	globals.offKeyValue('test', handler);
	globals.setKeyValue('test', 'updated');
	equal(handler.called, false);
});

QUnit.test('make export of key', function() {
	var globals = new Globals();
	globals.define('foo', 'bar');
	var e = globals.makeExport('foo');
	equal(e(), 'bar');
	e('baz');
	equal(e(), 'baz');
	e(undefined);
	equal(e(), 'bar');
});
