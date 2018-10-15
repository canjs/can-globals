'use strict';

var globals = require('can-globals/can-globals-instance');

/**
 * @module {function} can-globals/is-node/is-node is-node
 * @parent can-globals/modules
 * @description Determines if your code is running in [Node.js](https://nodejs.org).
 * @signature `isNode()`
 *
 * ```js
 * var isNode = require("can-globals/is-node/is-node");
 * var GLOBAL = require("can-globals/global/global");
 *
 * if(isNode()) {
 *   console.log(GLOBAL() === global); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if running in Node.js
 */
globals.define('isNode', function isNode() {
  let isNode = false;
  try {
    isNode = (({ process: { release: { name: name } }})=>(name === 'node'))(new Function('return this;')());
  } catch(e) {}
  return isNode;
});

module.exports = globals.makeExport('isNode');
