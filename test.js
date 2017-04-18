var globals = require('./can-globals');

console.log(globals.test === undefined);
globals.initialize("test", "defaulted");
console.log(globals.test === "defaulted");
globals.test = "updated";
console.log(globals.test === "updated");
globals.test = "updated again";
console.log(globals.test === "updated again");
globals.test = undefined;
console.log(globals.test === undefined);
delete globals.test;
console.log(globals.test === "defaulted");
globals.test = "updated again again";
console.log(globals.test === "updated again again");
delete globals.test;
console.log(globals.test === "defaulted");

globals.initialize("foo", function() {
	return "foobar";
});
console.log(globals.foo === "foobar");
