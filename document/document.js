'use strict';

require('can-globals/global/global');
var globals = require('can-globals/can-globals-instance');

/**
 * @module {function} can-globals/document/document document
 * @parent can-globals/modules
 * 
 * Get the global [`document`](https://developer.mozilla.org/en-US/docs/Web/API/document) object for the current context.
 * 
 * @signature `DOCUMENT([newDocument])`
 * 
 * Optionally sets, and returns, the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/document) object for the context.
 * 
 * ```js
 * var documentShim = { getElementById() {...} };
 * var DOCUMENT = require('can-globals/document/document');
 * DOCUMENT(documentShim); //-> document
 * DOCUMENT().getElementById('foo');
 * ```
 *
 * @param {Object} [newDocument] An optional document-like object to set as the context's document 
 * 
 * @return {Object} The window object for this JavaScript environment.
 */
globals.define('document', function(){
	let document = globals.getKeyValue('global').document;
	if (!document) {
		throw new Error('Could not find global.document please read https://github.com/canjs/can-globals')
	}
	return document;
});

module.exports = globals.makeExport('document');
