'use strict';

var QUnit = require('../../test-wrapper');
var isPromise = require('./is-promise-like');

QUnit.module("can-globals/js/is-promise-like");

QUnit.test("basics", function(){
	QUnit.ok(isPromise({ then: function(){} }));
});
