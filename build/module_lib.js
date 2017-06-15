/**
 * build 时 lib.js 中包含的文件
 */

var v = ['vue']
var r = ['vue-router']
var a = ['axios', 'qs', 'es6-promise']

var lib = [
    v, // vue
    v.concat(a), // vue && axios
    v.concat(r), // vue && vue-router
    v.concat(r, a) // vue && vue-router && axios
]

module.exports = lib
