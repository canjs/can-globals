'use strict';

var QUnit = require('../../test-wrapper');
var isFunction = require('./is-function');

QUnit.module("can-globals/js/is-function");

QUnit.test("basics", function(){
	QUnit.ok(isFunction(function(){}));
});
