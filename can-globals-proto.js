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

module.exports = Globals;
