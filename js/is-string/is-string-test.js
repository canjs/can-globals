'use strict';

var QUnit = require('../../test-wrapper');
var isString = require('./is-string');

QUnit.module("can-globals/js/is-string");

QUnit.test("basics", function(){
	QUnit.equal(isString("yes"), true);
	QUnit.equal(isString(String("yes")), true);
});
