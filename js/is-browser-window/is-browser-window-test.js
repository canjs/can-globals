'use strict';

var QUnit = require('../../test-wrapper');
var isBrowserWindow = require('./is-browser-window');

QUnit.module("can-globals/js/is-browser-window");

QUnit.test("basics", function(){
	equal(typeof isBrowserWindow(), "boolean");
});
