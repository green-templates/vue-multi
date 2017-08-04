/**
 * 从 axios 封装的 ajax 构造函数
 * e.g.
 * import InitAjax from './InitAjax.js
 * var ajax1 = new InitAjax()
 * var ajax2 = new InitAjax({
 *  config() {
 *      return {
 *          headers: {}
 *      }
 *  },
 *  host: ''
 * })
 */

// 兼容某些低版本手机不支持 Promise  e.g. 锤子
// https://github.com/mzabriskie/axios#promises
require('es6-promise').polyfill();

import axios from 'axios';
//  using application/x-www-form-urlencoded
// https://github.com/mzabriskie/axios#using-applicationx-www-form-urlencoded-format
import qs from 'qs';

import setGlobal from './_global'
import setOption from './_self'

/**
 * @param {Object} options.config 配置 对应 axios.defaults
 * @param {String | Object} options.host 域名配置
 * String => 'testing-host'
 * Object => {
 *  online: 'online-host',
 *  testing: 'testing-host'
 * }
 */
var defaults = {
    config: {
        headers: {}
    },
    host: ''
}

/**
 * 设置 ajax 配置
 * @param {Object} options 配置选项
 */
function InitAjax(options) {
    this.options = tool.merge(true, defaults, options)

    this.host = setOption.setHost(this.options.host)

    this.instance = axios.create(setOption.setConfig(this.options.config))
    setGlobal(this.instance)
    // console.log(this)
}

InitAjax.prototype = {
    all: axios.all,
    spread: axios.spread,
    /**
     * 请求方法
     * @param {String} url 请求地址
     * @param {Object} params 参数
     * @param {Object} options axios.defaults 配置, 可添加 loading: 3|4|false 参数 修改 loading 样式, 默认为 3, post 为 4
     */
    get(url, params, options) {
        return this.instance.get(this.host + url, tool.merge({ params }, options))
    },
    post(url, params, options) {
        return this.instance.post(this.host + url, qs.stringify(params), options)
    }
}

export default InitAjax

// var a = axios.create({ headers: {} })
// var b = axios.create({ headers: {} })
// a.defaults.a = 1
// a.defaults.headers.a = 1
// b.defaults.b = 1
// b.defaults.headers.b = 1
// console.log(a.defaults)
// console.log(b.defaults)


/**
 * ajax.all()
 * ajax.spread()
 *
function api1() {
    return ajax.get('api')
}

function api2() {
    return ajax.get('api')
}

function api3() {
    return ajax.get('api')
}

ajax.all([api1(), api2(), api3()])
    .then((res) => {
        // @param {Array} res
    })
    or
    .then(ajax.spread((res1, res2, res3) => {
        // @param {Object} res1 res2 res3
    }))
 */
