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

QUnit.test('getKeyValue of undefined property', function() {
	globals = new Globals();
	globals.getKeyValue('test');
	ok(true);
});

QUnit.test('setKeyValue of undefined property', function() {
	globals = new Globals();
	globals.setKeyValue('foo', 'bar');
	equal(globals.getKeyValue('foo'), 'bar');
});

QUnit.test('deleteKeyValue of undefined property', function() {
	globals = new Globals();
	globals.deleteKeyValue('test');
	ok(true);
});

QUnit.test('onKeyValue of undefined property', function() {
	globals = new Globals();
	globals.onKeyValue('test', function() {});
	ok(true);
});

QUnit.test('offKeyValue of undefined property', function() {
	globals = new Globals();
	globals.offKeyValue('test', function() {});
	ok(true);
});

QUnit.test('makeExport of undefined property', function() {
	globals = new Globals();
	globals.makeExport('test');
	ok(true);
});

QUnit.test('define with cache disabled', function() {
	var getter = sinon.spy(function(){
		return 'bar';
	});
	globals = new Globals();
	globals.define('foo', getter, false);
	loop(function(){
		globals.getKeyValue('foo');
	}, 5);
	equal(getter.callCount, 5);
});

QUnit.test('define with cache enabled', function() {
	var getter = sinon.spy(function(){
		return 'bar';
	});
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

QUnit.test('setKeyValue of existing property to string', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', 'updated');
	equal(globals.getKeyValue('test'), 'updated');
});

QUnit.test('setKeyValue of existing property to undefined', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', undefined);
	equal(globals.getKeyValue('test'), undefined);
});

QUnit.test('setKeyValue of existing property to a function', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', function(){
		return 'foo';
	});
	equal(globals.getKeyValue('test'), 'foo');
});

QUnit.test('setKeyValue on an existing property should reset cache', function(){
	var globals = new Globals();
	var bar = sinon.spy(function(){
		return 'bar';
	});
	globals.define('foo', bar);
	globals.getKeyValue('foo');
	globals.setKeyValue('foo', function(){
		return 'baz';
	});
	equal(globals.getKeyValue('foo'), 'baz');
});

QUnit.test('deleteKeyValue to reset property to default', function() {
	var globals = new Globals();
	globals.define('test', 'default');
	globals.setKeyValue('test', 'updated');
	globals.deleteKeyValue('test');
	equal(globals.getKeyValue('test'), 'default');
});

QUnit.test('deleteKeyValue should clear cache', function() {
	var globals = new Globals();
	var bar = sinon.spy(function(){
		return 'bar';
	});
	globals.define('foo', bar);
	globals.getKeyValue('foo');
	globals.setKeyValue('foo', function(){
		return 'baz';
	});
	globals.deleteKeyValue('foo');
	globals.getKeyValue('foo');
	equal(bar.calledTwice, true);
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

QUnit.test('makeExport of key', function() {
	var globals = new Globals();
	globals.define('foo', 'bar');
	var e = globals.makeExport('foo');
	equal(e(), 'bar');
	e('baz');
	equal(e(), 'baz');
	e(undefined);
	equal(e(), 'bar');
});

QUnit.test('reset export value with null (can-stache#288)', function() {
	var globals = new Globals();
	globals.define('foo', 'bar');
	var e = globals.makeExport('foo');
	equal(e(), 'bar');
	e('baz');
	equal(e(), 'baz');
	e(null);
	equal(e(), 'bar');
});

QUnit.test('reset all keys', function(){
	var globals = new Globals();
	var bar = sinon.spy(function(){
		return 'bar';
	});
	var qux = sinon.spy(function(){
		return 'qux';
	});
	globals.define('foo', bar);
	globals.define('baz', qux);
	loop(function(){
		globals.getKeyValue('foo');
		globals.getKeyValue('baz');
	}, 5);
	globals.reset();
	loop(function(){
		globals.getKeyValue('foo');
		globals.getKeyValue('baz');
	}, 5);
	equal(bar.calledTwice, true);
	equal(qux.calledTwice, true);
});

QUnit.test('reset triggers events', function(){
	var globals = new Globals();
	var fooHandler = sinon.spy();
	var barHandler = sinon.spy();
	globals.define('foo', true);
	globals.define('bar', true);
	globals.setKeyValue('foo', false);
	globals.setKeyValue('bar', false);
	globals.onKeyValue('foo', fooHandler);
	globals.onKeyValue('bar', barHandler);
	globals.reset();
	equal(fooHandler.called, true);
	equal(barHandler.called, true);
});

QUnit.test('export helper value can be set to a function', function(){
	var globals = new Globals();
	var spy = sinon.spy();
	globals.setKeyValue('foo', function(){
		return function(){};
	});
	var fooExport = globals.makeExport('foo');
	fooExport(spy);
	QUnit.equal(typeof fooExport(), 'function');
	QUnit.equal(spy.callCount, 0);
	fooExport()();
	QUnit.equal(spy.callCount, 1);
});
