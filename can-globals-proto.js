function Globals() {

}

Globals.prototype.initialize = function(key, value, cache) {
	var cached = false;
	Object.defineProperty(Globals.prototype, key, {
		get: function() {
			if (!cached && typeof value === "function") {
				if (cache) {
					value = value();
					cached = true;
				}
				else {
					return value();
				}
			}

			return value;
		},
		set: function set(value) {
			Object.defineProperty(this, key, {
				configurable: true,
				get: function() {
					return value;
				},
				set: set
			});
		}
	});
};

Globals.prototype.makeExport = function(key) {
	return function(value) {
		if (arguments.length === 0) {
			return this[key];
		}

		if (typeof value === 'undefined') {
			delete this[key];
		}
		else {
			this[key] = value;
		}
	}.bind(this);
};

module.exports = Globals;
