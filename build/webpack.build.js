var shell = require('shelljs')
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var module_lib = require('./module_lib')

// lib
var args = process.argv.slice(2)
var libArg = args[1]

if (!(libArg <= 3 && libArg >= 0)) {
    console.log('========== 请输入 lib 参数 ==========')
    console.log('0 - vue')
    console.log('1 - vue && axios')
    console.log('2 - vue && vue-router')
    console.log('3 - vue && vue-router && axios')
    console.log('')
    console.log('Example:')
    console.log('npm run build multi 2')
    console.log('')
    process.exit()
}
// package.json 中 的依赖
config.entry.lib = module_lib[libArg]

config.entry.service = [
    path.resolve(__dirname, '../src/modules/' + config.moduleName + '/service/service.js')
];
config.output.filename = 'static/js/[name].[chunkhash:7].js';

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
    'axios': 'axios/dist/axios.min.js',
    'es6-promise': 'es6-promise/dist/es6-promise.min.js'
}

config.plugins.unshift(
    //清空dist
    new CleanWebpackPlugin(['dist/' + config.moduleName], {
        // 根的绝对路径
        "root": path.resolve(__dirname, '../'),
        // 将log写到 console.
        "verbose": true,
        // 排除不删除的目录，主要用于避免删除公用的文件
        "exclude": []
    }),

    //通用模块单独打包 manifest为runtime文件，里面包含了每个文件的hash，每次打包都会改变
    //htmlWebpackPlugin 从右到左 依次插入index.html，如果 service 依赖于 lib ，需要把 service 放到 lib 前， e.g. service 为 Vue.direcitve，lib 为 vue
    new webpack.optimize.CommonsChunkPlugin({
        names: ['service', 'lib', 'manifest'],
        // names: ['lib', 'manifest'],
        filename: 'static/js/[name].[chunkhash:7].js' //默认加hash
    }),

    //提取 require('xxx.css')
    //before bg: url(../images/bg.jpg)
    //after    bg: url(images/bg.jpg) => dist/css/images/bg.jpg
    //https://github.com/webpack/extract-text-webpack-plugin/issues/27
    new ExtractTextPlugin('static/css/layout.[contenthash:7].css'),
    // new ExtractTextPlugin('layout.[contenthash:7].css'),
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

    shell.cp('-R', './static/*', './dist/' + config.moduleName + '/static')

    process.stdout.write(stats.toString({
        chunks: false,
        colors: true
    }));
});
