/**
 * 获取 'src/modules/' 下的文件夹, 设置 entrys
 */

const path = require('path')
const glob = require('glob')

const entrys = {}
const modules = []

const files = glob.sync(path.resolve(__dirname, '../src/modules/**/main.js'))

// 读取开发目录,并进行路径裁剪
files.forEach(name => {
  const start = name.indexOf('modules/') + 8
  const end = name.length - 3
  let n = name.slice(start, end)
  n = n.slice(0, n.lastIndexOf('/')) // 保存各个组件的入口

  entrys[n] = name

  modules.push(n)
})

console.log('========== entrys ==========')
console.log(entrys)
console.log('')

console.log('========== modules ==========')
console.log(modules)
console.log('')

exports.entrys = entrys
exports.modules = modules
