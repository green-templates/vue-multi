/**
 * 设置 HtmlWebpackPlugin
 */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var getEntry = require('./entry')

function getConfig(name) {
    return {
        filename: process.env.NODE_ENV == 'dev' ? name + '/index.html' : 'index.html',
        template: path.resolve(__dirname, '../src/modules/' + name + '/index.html'),
        chunksSortMode: 'dependency', //按依赖顺序引入
        chunks: [name, 'service', 'lib', 'manifest'], // 每个html引用的js模块
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    }
}

module.exports = (name, type) => {
    var htmlPlugins = []

    if (type == 'all') {
        for (var k in getEntry.modules) {
            if (getEntry.modules.hasOwnProperty(k)) {
                var el = getEntry.modules[k];
                htmlPlugins.push(new HtmlWebpackPlugin(getConfig(el)))
            }
        }
    } else {
        htmlPlugins.push(new HtmlWebpackPlugin(getConfig(name)))
    }
    return htmlPlugins
}
