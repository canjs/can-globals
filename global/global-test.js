'use strict';
var getGlobal = require('./global');
var QUnit = require('../../test-wrapper');

function isBrowserWindow(){
	return typeof window !== 'undefined' &&
		typeof document !== 'undefined' && typeof SimpleDOM === 'undefined';
}

QUnit.module('can-globals/global/global');

test('basics', function(){
	if(isBrowserWindow()) {
		ok(getGlobal() === window);
	} else {
		ok(getGlobal() === global);
	}
});

if(!isBrowserWindow()) {
	QUnit.module('in Node with fake window', {
		setup: function(){
			this.oldWindow = global.window;
			global.window = {};
		},
		teardown: function(){
			global.window = this.oldWindow;
		}
	});

	test('Gets the Node global', function(){
		ok(getGlobal() === global);
	});
}
