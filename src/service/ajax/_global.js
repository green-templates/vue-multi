/**
 * ajax 全局配置
 */

/**
 * loading type
 * @param {String} config ajax 配置
 * 3: 全屏覆盖  4: 中间一块  false: 无
 */
var loading = (config) => {
    // console.log(config)
    var type = 3

    if (config.method == 'post') {
        type = 4
    }
    return config.loading || type
}

/**
 * err 处理
 * @param {Object} error
 */
var errHandle = (error) => {
    // console.log('Response', error.response);
    // console.log('Request', error.request);
    // console.log('Error', error.message);
    // console.log('Config', error.config);

    var errMsg = error.message.indexOf('timeout') > -1 ? '请求超时' : '网络错误';

    layer.warning('', {
        content: errMsg + '<p class="xhr-info">' + error.message + '</p>'
    })
}

/**
 * axios 全局配置
 * @param {Object} instance  axios 实例
 */
export default (instance) => { /*添加请求拦截器*/
    instance.interceptors.request.use(function(config) {
        /*在发送请求之前做某事*/
        if (config.loading !== false) layer.loading(loading(config))
        return config;

    }, function(error) {
        /*请求错误时做些事*/
        errHandle(error)
        return Promise.reject(error);
    });

    /*添加响应拦截器*/
    instance.interceptors.response.use(function(res) {
        /*对响应数据做些事*/
        // console.log(res)
        layer.closeAll()

        return res.data;

    }, function(error) {
        /*请求错误时做些事*/
        errHandle(error)
        return Promise.reject(error);
    });
}
