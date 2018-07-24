import * as tcheck from '../tcheck'
import * as utils from '../utils'

// 各实例不同配置
export default {
  /**
   * 设置 host
   * @param {String|Object} hosts
   * String => 'testing-host'
   * Object => {
   *  online: 'online-host',
   *  testing: 'testing-host'
   * }
   */
  setHost (hosts) {
    let host = ''

    if (hosts && tcheck.isString(hosts)) host = hosts

    if (tcheck.isObject(hosts)) {
      host = utils.env.isOnline() ? hosts.online : hosts.testing
    }

    return host
  },
  /**
   * 设置 axios.defaults 配置
   * @param {Object} options
   * @param {Object} instance axios 实例
   */
  setConfig (options, instance) {
    const config = {
      headers: {}
    }

    // 处理 headers 中文等非法字符
    if (options && options.headers) {
      for (var k in options.headers) {
        var el = options.headers[k]
        options.headers[k] = encodeURI(el)
      }
    }

    if (instance) {
      return utils.merge(instance.defaults, config, options)
    }

    return utils.merge(config, options)
  }
}
