process.env.NODE_ENV = 'development'

const path = require('path')
const utils = require('./utils')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const devWebpackConfig = require('./webpack.dev.conf')
const config = require('../config')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

let serverHost = config.dev.host
let serverPort = config.dev.port

const moduleName = utils.getModuleName()

const getDevConfig = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port

      serverPort = port
      const startPage = `http://${serverHost}:${port}`

      // 修改 devServer 监听路由
      const entrys = devWebpackConfig.entry
      for (const k in entrys) {
        if (entrys.hasOwnProperty(k)) {
          const entry = entrys[k]
          entrys[k] = [
            // 热加载
            `webpack-dev-server/client?${startPage}`,
            // 热替换
            'webpack/hot/dev-server',
            entry
          ]
        }
      }

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: ${startPage}`]
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
        })
      )
      resolve(devWebpackConfig)
    }
  })
})

getDevConfig.then(devConfig => {
  const compiler = Webpack(devConfig)

  const server = new WebpackDevServer(compiler, {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, '../src', moduleName, 'index.html') }]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    proxy: config.dev.proxyTable
  })

  server.listen(serverPort, serverHost, err => {
    if (err) console.log(err)
  })
})
