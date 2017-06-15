/**
 * build 时 lib.js 中包含的文件
 */

var v = ['vue']
var r = ['vue-router']
var a = ['axios', 'qs', 'es6-promise']

var lib = [
    v, // single
    v.concat(a), // single && axios
    v.concat(r), // multi
    v.concat(r, a) // multi && axios
]

module.exports = lib
