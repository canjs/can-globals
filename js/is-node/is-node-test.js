'use strict';

var QUnit = require('../../test-wrapper');
var isNode = require('./is-node');

QUnit.module("can-globals/js/is-node");

test("basics", function(){
	QUnit.equal(typeof isNode(), "boolean");
});
