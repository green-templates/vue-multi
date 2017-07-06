/**
 * ajax 各实例不同配置
 */

export default {
    /**
     * 环境判断
     */
    env: {
        isDev() {
            return !!location.port
        },
        isOnline() {
            return location.origin.indexOf('.com') > -1
        },
        isTesting() {
            return !(this.isDev() && this.isOnline())
        }
    },
    /**
     * 设置 host
     * @param {String | Object} hosts
     * String => 'testing-host'
     * Object => {
     *  online: 'online-host',
     *  testing: 'testing-host'
     * }
     */
    setHost(hosts) {
        var host = ''

        if (hosts && tcheck.isString(hosts) && !this.env.isOnline()) host = hosts

        if (tcheck.isObject(hosts)) {
            // 线上
            if (this.env.isOnline()) host = hosts.online
            // 测试
            if (this.env.isTesting()) host = hosts.testing
        }

        return host
    },
    /**
     * 设置 axios.defaults 配置
     * @param {Object} options
     * @param {Object} instance axios 实例
     */
    setConfig(options, instance) {
        var config = {
            headers: {}
        }

        if (instance) {
            return tool.merge(instance.defaults, config, options)
        }

        return tool.merge(config, options)
    }
}
