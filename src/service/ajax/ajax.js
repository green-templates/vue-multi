// 兼容某些低版本手机不支持 Promise  e.g. 锤子
// https://github.com/mzabriskie/axios#promises
require('es6-promise').polyfill();

import axios from 'axios';
//  using application/x-www-form-urlencoded
// https://github.com/mzabriskie/axios#using-applicationx-www-form-urlencoded-format
import qs from 'qs';

import setGlobal from './_global'

!((window) => {
    var instance = axios.create()
    setGlobal(instance)

    var host = ''

    var ajax = {
        all: axios.all,
        spread: axios.spread,

        get(url, params, options) {
            return instance.get(host + url, { params })
        },
        post(url, params, options) {
            return instance.post(host + url, qs.stringify(params))
        }
    }

    window.ajax = ajax;
})(window)

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
        console.log(res)
    })
    or
    .then(ajax.spread((res1, res2, res3) => {
        // @param {Object} res
        console.log(res1)
        console.log(res2)
        console.log(res3)
    }))
 */
