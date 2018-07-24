/**
 * 设置不同环境 publicPath
 * publicPath + assetsPath
 */
// 一般为 location.pathname
// url(../images/a.png) => url(/vue/ + static/images/a.png)
let publicPath = './'

// 添加 cdn 地址
// url(../images/a.png) => url(cdn + static/images/a.png)
const cdn = {
  online: '',
  testing: ''
}

const args = process.argv

if (args.indexOf('--cdn') > -1) publicPath = cdn.online
if (args.indexOf('--cdn-t') > -1) publicPath = cdn.testing

module.exports = publicPath
