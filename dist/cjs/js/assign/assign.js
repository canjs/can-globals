/*can-globals@0.0.0-pre#js/assign/assign*/
module.exports = function (d, s) {
    for (var prop in s) {
        d[prop] = s[prop];
    }
    return d;
};