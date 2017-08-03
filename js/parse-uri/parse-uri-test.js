'use strict';
var parseURI = require('./parse-uri');
var QUnit = require('../../test-wrapper');

QUnit.module("can-globals/js/parse-uri");

QUnit.test("basics", function(){
	QUnit.deepEqual(parseURI("http://foo:8080/bar.html#change"), {
    authority: "//foo:8080",
    hash: "#change",
    host: "foo:8080",
    hostname: "foo",
    href: "http://foo:8080/bar.html#change",
    pathname: "/bar.html",
    port: "8080",
    protocol: "http:",
    search: ""
  });
});
