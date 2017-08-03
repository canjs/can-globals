'use strict';

var QUnit = require('../../test-wrapper');
var isWebWorker = require('./is-web-worker');

QUnit.module("can-globals/js/is-web-worker");

QUnit.test("basics", function(){
	QUnit.equal(typeof isWebWorker() , "boolean");
});
