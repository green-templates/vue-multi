;
!((window) => {
    var tcheck = {
        isString(o) {
            return Object.prototype.toString.call(o) === '[object String]';
        },
        isNumber(o) {
            return Object.prototype.toString.call(o) === '[object Number]';
        },
        isBoolean(o) {
            return Object.prototype.toString.call(o) === '[object Boolean]';
        },
        isArray(o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        },
        isObject(o) {
            return Object.prototype.toString.call(o) === '[object Object]';
        },
        isFunction(o) {
            return Object.prototype.toString.call(o) === '[object Function]';
        },
        isReg(o) {
            return Object.prototype.toString.call(o) === '[object RegExp]';
        },
        isDate(o) {
            return Object.prototype.toString.call(o) === '[object Date]';
        },
        isUndefined(o) {
            return Object.prototype.toString.call(o) === '[object Undefined]';
        },
        isNull(o) {
            return Object.prototype.toString.call(o) === '[object Null]';
        },
        isArrObj(i) {
            return this.isArray(i) || this.isObject(i)
        }
    }

    window.tcheck = tcheck;
})(window)
