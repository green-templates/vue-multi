/**
 * 设置 HtmlWebpackPlugin
 * 生成多个页面模版
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const getEntry = require('./entry')

function getConfig (name) {
  return {
    // 设置不同目录的 index.html
    filename: process.env.NODE_ENV === 'development' ? name + '/index.html' : 'index.html',
    template: path.resolve(__dirname, '../src/modules/' + name + '/index.html'),
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // index.html 注入文件，区分不同目录，默认 all 无法区分不同的项目
    chunks: [name, 'vendor', 'manifest'],
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }
}

module.exports = (name) => {
  const htmlPlugins = []

  if (name === 'all') {
    for (const k in getEntry.modules) {
      if (getEntry.modules.hasOwnProperty(k)) {
        const el = getEntry.modules[k]
        htmlPlugins.push(new HtmlWebpackPlugin(getConfig(el)))
      }
    }
  } else {
    htmlPlugins.push(new HtmlWebpackPlugin(getConfig(name)))
  }
  // console.log(htmlPlugins)
  return htmlPlugins
}
