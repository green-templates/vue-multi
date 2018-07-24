/**
 * 类型检查
 */
export function isString (o) {
  return Object.prototype.toString.call(o) === '[object String]'
}

export function isNumber (o) {
  return Object.prototype.toString.call(o) === '[object Number]'
}

export function isBoolean (o) {
  return Object.prototype.toString.call(o) === '[object Boolean]'
}

export function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

export function isObject (o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function isFunction (o) {
  return Object.prototype.toString.call(o) === '[object Function]'
}

export function isReg (o) {
  return Object.prototype.toString.call(o) === '[object RegExp]'
}

export function isDate (o) {
  return Object.prototype.toString.call(o) === '[object Date]'
}

export function isUndefined (o) {
  return Object.prototype.toString.call(o) === '[object Undefined]'
}

export function isNull (o) {
  return Object.prototype.toString.call(o) === '[object Null]'
}
