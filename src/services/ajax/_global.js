/**
 * axios 全局配置
 * @param {Object} instance  axios 实例
 */
export default instance => {
  /* 添加请求拦截器 */
  instance.interceptors.request.use(
    config => {
      /* 在发送请求之前做某事 */
      // console.log('=== request ===')
      // console.log(config)
      return config
    },
    error => {
      /* 请求错误时做些事 */
      return Promise.reject(error)
    }
  )

  /* 添加响应拦截器 */
  instance.interceptors.response.use(
    response => {
      const res = response.data
      // console.log('=== response ===')
      // console.log(res)
      /* 对响应数据做些事 */
      return res
    },
    error => {
      /* 请求错误时做些事 */
      return Promise.reject(error)
    }
  )
}
