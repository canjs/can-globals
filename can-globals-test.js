'use strict';
var Globals = require('./can-globals-proto');
var QUnit = require('./test-wrapper');
var sinon = require('sinon');
var globals;

function mapEvents(spy){
	return spy.args.reduce(function(acc, cur) {
		return acc.concat({
			type: cur[0].type,
			key: cur[0].detail.key,
			value: cur[0].detail.value
		});
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
		globals.get('test');
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('set undefined property', function() {
	globals = new Globals();
	try{
		globals.set('test');
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('reset undefined property', function() {
	globals = new Globals();
	try{
		globals.reset('test');
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('on undefined property', function() {
	globals = new Globals();
	try{
		globals.on('test', function() {});
	}catch(e){
		return ok(true);
	}
	ok(false);
});

QUnit.test('off undefined property', function() {
	globals = new Globals();
	try{
		globals.off('test', function() {});
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
	globals.define('foo', getter);
	loop(function(){
		globals.get('foo');
	}, 5);
	equal(getter.callCount, 5);
});

QUnit.test('define cache enabled', function() {
	var getter = sinon.spy();
	globals = new Globals();
	globals.define('foo', getter, true);
	loop(function(){
		globals.get('foo');
	}, 5);
	equal(getter.calledOnce, true);
});

QUnit.test('define and get a new property', function() {
	globals = new Globals();
	globals.define('test', 'default');
	equal(globals.get('test'), 'default');
});

QUnit.test('set existing property to string', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.set('test', 'updated');
	equal(globals.get('test'), 'updated');
});

QUnit.test('set existing property to undefined', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.set('test', undefined);
	equal(globals.get('test'), undefined);
});

QUnit.test('set existing property to a function', function() {
	globals = new Globals();
	globals.define('test', 'default');
	globals.set('test', function(){
		return 'foo';
	});
	equal(globals.get('test'), 'foo');
});

QUnit.test('reset property to default', function() {
	var globals = new Globals();
	globals.define('test', 'default');
	globals.set('test', 'updated');
	globals.reset('test');
	equal(globals.get('test'), 'default');
});

QUnit.test('listen for all changes', function() {
	var globals = new Globals();
	var handler = sinon.spy();
	globals.define('test', 'default');
	globals.on(handler);
	globals.set('test', 'updated');
	globals.reset('test');
	equal(handler.callCount, 2);
	deepEqual(mapEvents(handler), [
		{
			type: 'set',
			key: 'test',
			value: 'updated'
		},
		{
			type: 'reset',
			key: 'test',
			value: 'default'
		}
	]);
});

QUnit.test('listen for key change', function() {
	var globals = new Globals();
	var handler = sinon.spy();
	globals.define('test', 'default');
	globals.define('foo', 'bar');
	globals.on('test', handler);
	globals.set('test', 'updated');
	globals.set('foo', 'baz');
	globals.reset('test');
	equal(handler.callCount, 2);
	deepEqual(mapEvents(handler),
		[
			{
				type: 'set',
				key: 'test',
				value: 'updated'
			},
			{
				type: 'reset',
				key: 'test',
				value: 'default'
			}
		]
	);
});

QUnit.test('remove event listener for all', function() {
	var globals = new Globals();
	var handler = sinon.spy();
	globals.define('test', 'foo');
	globals.on(handler);
	globals.off(handler);
	globals.set('test', 'updated');
	equal(handler.called, false);
});

QUnit.test('remove event listener for key', function() {
	var globals = new Globals();
	var handler = sinon.spy();
	globals.define('test', 'foo');
	globals.on('test', handler);
	globals.off('test', handler);
	globals.set('test', 'updated');
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
