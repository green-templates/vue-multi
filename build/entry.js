var path = require('path')
var glob = require('glob')

module.exports = (function() {
    var entry = {}; //读取开发目录,并进行路径裁剪
    var modules = []

    var files = glob.sync(path.resolve(__dirname, '../src/modules/**/app.js'))

    files.forEach(function(name) {
        var start = name.indexOf('modules/') + 8,
            end = name.length - 3;
        var n = name.slice(start, end);
        n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口
        entry[n] = name;

        modules.push(n)
    });

    return {
        entry,
        modules
    }
})()
