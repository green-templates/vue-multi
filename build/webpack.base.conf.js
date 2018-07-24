'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const merge = require('webpack-merge')
const chalk = require('chalk')

const i18n = {
  loaders: {
    // you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
    i18n: '@kazupon/vue-i18n-loader'
  }
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// 获取入口
const getEntrys = require('./entry').entrys
const getModules = require('./entry').modules

const moduleName = utils.getModuleName()

console.log(chalk.cyan('========== moduleName =========='))
console.log(chalk.cyan(moduleName))
console.log('')

let entry = {}

// 判断模块是否存在
if (getModules.indexOf(moduleName) > -1) {
  console.log(chalk.green('========== run ' + moduleName + ' =========='))
  console.log('')
  entry[moduleName] = getEntrys[moduleName]
} else if (process.env.NODE_ENV === 'development' && moduleName === 'all') {
  // deevServer 时判断 all 字段
  console.log(chalk.green('========== run ' + moduleName + ' =========='))
  console.log('')
  entry = getEntrys
} else {
  console.log(chalk.red('========== 请输入正确的模块名 =========='))
  console.log('')
  process.exit()
}

// 获取 htmlPlugin
const htmlPlugins = require('./htmlPlugin')(moduleName)

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry,
  output: {
    path: path.resolve(config.build.assetsRoot, moduleName),
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: merge(i18n, config.build.extractVueCss ? vueLoaderConfig : {})
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: true,
                colors: 64,
                optimizationLevel: 3
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ].concat(htmlPlugins),
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
