var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

// package.json 中 的依赖
// config.entry.lib = [
//     // 'jquery',
//     'vue',
//     'vue-router',
//     'axios',
//     'qs'
// ];
// config.entry.service = [
//     path.resolve(__dirname, '../src/service/service.js')
// ];
config.output.filename = '[name].[chunkhash:7].js';

// config.output.publicPath = '//cdn.com/demo/';

config.module.loaders.forEach(function(el) {
    if (el.test.toString() === /\.css$/.toString()) {
        el.loader = ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss');
    }
    if (el.test.toString() === /\.scss$/.toString()) {
        el.loader = ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!sass');
    }
});

config.resolve.alias = {
    'vue': 'vue/dist/vue.min.js',
    'vue-router': 'vue-router/dist/vue-router.min.js',
    'axios': 'axios/dist/axios.min.js'
}

config.plugins.unshift(
    //清空dist
    new CleanWebpackPlugin(['dist/modules/' + config.moduleName], {
        // 根的绝对路径
        "root": path.resolve(__dirname, '../'),
        // 将log写到 console.
        "verbose": true,
        // 排除不删除的目录，主要用于避免删除公用的文件
        "exclude": []
    }),

    //通用模块单独打包 manifest为runtime文件，里面包含了每个文件的hash，每次打包都会改变
    //htmlWebpackPlugin 从右到左 依次插入index.html，如果 service 依赖于 lib ，需要把 service 放到 lib 前， e.g. service 为 Vue.direcitve，lib 为 vue
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ['service', 'lib', 'manifest'],
    //     // names: ['lib', 'manifest'],
    //     filename: '[name].[chunkhash:7].js' //默认加hash
    // }),

    //提取 require('xxx.css')
    //before bg: url(../images/bg.jpg)
    //after    bg: url(images/bg.jpg) => dist/css/images/bg.jpg
    //https://github.com/webpack/extract-text-webpack-plugin/issues/27
    // new ExtractTextPlugin('css/layout.[contenthash:7].css'),
    new ExtractTextPlugin('layout.[contenthash:7].css'),
    /*    new ExtractTextPlugin('layout.[contenthash:7].css', {
            allChunks : true
        }),*/

    //压缩 会把autoprefixer 的browsers设为默认值，之前配置无效  css?-autoprefixer
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

module.exports = config;

webpack(config, function(err, stats) {

    if (err) throw err;

    process.stdout.write(stats.toString({
        chunks: false,
        colors: true
    }));
});
