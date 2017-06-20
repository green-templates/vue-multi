var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var getpostcss = function() {
    var postcss = [
        autoprefixer()
    ];
    return postcss;
};

// 获取入口
var getEntry = require('./entry')

var args = process.argv.slice(2)
var moduleName = args[0] || ''

var entry = {}

if (getEntry.modules.indexOf(moduleName) > -1) {
    console.log('')
    console.log('========== build ' + moduleName + ' ==========')
    console.log('')

    entry[moduleName] = [path.resolve(__dirname, '../src/modules/' + moduleName + '/app.js')]

} else if (moduleName == 'all') {
    console.log('')
    console.log('========== build ' + moduleName + ' ==========')
    entry = getEntry.entry

} else {
    console.log('========== 请输入正确的模块名 ==========')
    console.log('')
    process.exit()
}
// 获取 htmlPlugin
var htmlPlugins = require('./htmlPlugin')(moduleName, args[0])

module.exports = {
    moduleName,
    //入口文件
    entry,

    output: {
        path: path.resolve(__dirname, '../dist/' + moduleName),
        publicPath: '',
        filename: 'static/js/[name].[hash:7].js',
        chunkFilename: 'static/js/[name].[chunkhash:7].js'
    },

    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue', '.scss'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        // 默认require 的不是 .min文件
        alias: {
            // 'jquery': 'jquery/dist/jquery.min',
            'vue': 'vue/dist/vue.js',
            'vue-router': 'vue-router/dist/vue-router.js'
        }
    },

    //引用的外部文件不打包
    externals: {
        // 'jquery': 'jquery',
        // 'vue': 'vue/dist/vue.min.js',
        // 'vue-router': 'vue-router/dist/vue-router.min.js'
    },

    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.(png|gif|jpe?g)(\?.*)?$/,
            loaders: [
                'url?limit=8192&name=static/images/[name].[hash:7].[ext]',
                'image-webpack'
            ]
        }, {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 8192,
                name: 'static/fonts/[name].[hash:7].[ext]'
            }
        }]
    },

    imageWebpackLoader: {
        mozjpeg: {
            progressive: true,
            quality: 65
        },
        pngquant: {
            quality: "65-90",
            speed: 4
        },
        gifsicle: {
            interlaced: true,
            colors: 64,
            optimizationLevel: 3
        }
    },

    //vue加配置
    vue: {
        loaders: {
            scss: 'style!css?-autoprefixer!sass'
        },
        postcss: getpostcss()
    },

    postcss: getpostcss(),

    plugins: [
        // 全局引用 不需要require
        new webpack.ProvidePlugin({
            // $: 'jquery',
            Vue: 'vue',
            VueRouter: 'vue-router'
        })
    ].concat(htmlPlugins)
};
