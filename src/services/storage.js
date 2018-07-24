import * as tcheck from './tcheck'

function isStrVal (i) {
  return tcheck.isString(i) && i !== ''
}

class SetStorage {
  constructor (type) {
    this.type = type + 'Storage'
    this.errMsg = '请打开浏览器cookie设置，并关闭无痕浏览'
  }

  /**
   * 设置
   * @param {String} name
   * @param {String | Object} val
   */
  set (name, val) {
    if (!isStrVal(name) || tcheck.isUndefined(val) || val === '') {
      return
    }
    if (!tcheck.isString(val)) val = JSON.stringify(val)

    try {
      window[this.type].setItem(name, val)
    } catch (error) {
      window.alert(this.errMsg)
    }
  }
  /**
   * 获取
   * @param {String} name
   * @param {Number} type 1 返回 object 否则 返回 string
   */
  get (name, type) {
    // if (!isStrVal(name)) {
    //   return
    // }

    // var val = window[this.type].getItem(name)
    // val = type ? JSON.parse(val) : val

    // return val
    try {
      return window[this.type].getItem(name)
    } catch (error) {
      window.alert(this.errMsg)
    }
  }
  /**
   * 删除
   * @param {String} name 没有时清除全部
   */
  remove (name) {
    try {
      if (!name) {
        window[this.type].clear()
        return
      }
      if (!tcheck.isString(name)) {
        return
      }
      window[this.type].removeItem(name)
    } catch (error) {
      window.alert(this.errMsg)
    }
  }
}

/**
 * localStrage
 */
export const local = new SetStorage('local')
/**
 * sessionStrage
 */
export const session = new SetStorage('session')

export const cookie = {
  /*
   * 获取 cookie 值
   * @param {String} name cookie 名称
   * @returns {String} value cookie 值
   */
  get (name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)

    if (arr) {
      return unescape(arr[2])
    } else {
      return ''
    }
  },
  /*
   * 设置 cookie
   * @param {String} name cookie 名称
   * @param {String} value cookie 值
   * @param {String} path cookie 路径
   * @param {Number} cycle cookie 的生命周期 /秒
   */
  set (name, value, path, cycle) {
    var expires = ''
    if (cycle) {
      var maxCycle = new Date()
      maxCycle.setTime(maxCycle.getTime() + cycle * 1000)
      expires = ';expires=' + maxCycle.toGMTString()
    }
    path = path ? ';path=' + path : ''
    document.cookie = name + '=' + escape(value) + expires + path
  },
  /*
   * 删除 cookie
   * @param {String} name cookie 名称
   * @param {String} path cookie 路径
   */
  remove (name, path) {
    var endCycle = new Date()
    endCycle.setTime(endCycle.getTime() - 1)
    var delValue = this.get(name)
    path = path ? ';path=' + path : ''
    document.cookie = name + '=' + delValue + ';expires=' + endCycle.toGMTString() + path
  }
}
