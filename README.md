# vue-multi
vue 多页面模版

## 开发及编译
安装 [libpng](https://www.npmjs.com/package/image-webpack-loader#libpng-issues)

```bash
# 安装依赖包，使用 yarn
yarn

# 启动开发服务
# module 对应 src/modules/ 下的文件夹名
# eg.
# yarn start single 只启动 single 的项目
# 访问 http://localhost:8080/single
# all 参数可以启动所有项目，访问所有路由
yarn start <module>
# http://localhost:8080/<module>

# 编译
# 对应 dist/<module>
# 没有 all 参数
yarn build <module>
```
