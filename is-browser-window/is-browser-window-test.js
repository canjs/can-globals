'use strict';

var QUnit = require('../../test-wrapper');
var isBrowserWindow = require('./is-browser-window');

QUnit.module("can-globals/is-browser-window/is-browser-window");

QUnit.test("basics", function(){
	equal(typeof isBrowserWindow(), "boolean");
});
