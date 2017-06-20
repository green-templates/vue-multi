process.env.NODE_ENV = 'dev'

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var net = require('net');
var ip = require('ip');
var open = require('opn');
var qrcode = require('qrcode-terminal');

var config = require('./webpack.config.js');

var port = 2222;
var localhost = ip.address();

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    //报错不会中断webpack
    new webpack.NoErrorsPlugin()
);

//生成sourceMap   sass, css, vue都要加
config.devtool = 'eval-source-map';

config.module.loaders.forEach(function(el) {
    if (el.test.toString() === /\.scss$/.toString()) {
        el.loader = 'style!css?sourceMap!postcss!sass?sourceMap';
    }
});

config.vue.loaders.scss = 'style!css?sourceMap!sass?sourceMap';

function startDev(port) {
    var startPage = 'http://' + localhost + ':' + port + '/';

    //开启 souceMap url() 图片相对路径会指向 （chrome:blob or chrome:devtools），需要设置 publicPath
    //https://github.com/webpack/style-loader/blob/master/README.md
    config.output.publicPath = startPage;

    for (var k in config.entry) {
        if (config.entry.hasOwnProperty(k)) {
            var el = config.entry[k];
            el.unshift(
                'webpack-dev-server/client?' + startPage, //热加载
                'webpack/hot/dev-server' //热替换
            )
        }
    }

    new WebpackDevServer(webpack(config), {
        // proxy: {
        //     '/api': {
        //         target: 'host',
        //         changeOrigin: true
        //     }
        // },
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        stats: {
            chunks: false,
            colors: true
        }
    }).listen(port, function(err, stats) {

        if (err) throw err;

        console.log('\n Listening at ' + startPage);

        qrcode.generate(startPage, { small: true });

        open(startPage);

    });
}

// 检测端口是否被占用
function checkPort(port, callback) {
    // 创建服务并监听该端口
    var server = net.createServer().listen(port)

    server.on('listening', function() { // 执行这块代码说明端口未被占用
        server.close() // 关闭服务
        console.log('\n The port ' + port + ' is available'); // 控制台输出信息

        typeof callback === 'function' && callback(port);
    })

    server.on('error', function(err) {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
            port++;
            console.log('\n The port ' + port + ' is occupied, changing to a new port ' + port);

            checkPort(port, callback);
        }
    })
}

checkPort(port, startDev);
