/*can-globals@0.0.0-pre#js/is-iterable/is-iterable*/
'use strict';
var canSymbol = require('can-symbol');
module.exports = function (obj) {
    return obj && !!obj[canSymbol.iterator || canSymbol.for('iterator')];
};