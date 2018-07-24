# bisale-activity
bisale 活动项目

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

## 开发
1. `single` `multi` 分别为 `不带路由` 和 `带路由` 功能的 demo，开发时可参考
2. `env.js` 非必需，用到 `接口请求` 时加上即可，静态页面可删除
3. 在 `src/modules` 目录下新建文件夹，`文件夹名称` 为 `页面访问路径`，注意格式尽量用 `-` 连接
4. `src/modules` 同级的目录为 `公共组件`，建议在模块内 `新建对应文件夹` 后引入，参考 `download`

## 部署
详见 https://bisale.org/d/59-fe  
`<module>` 对应部署时的 `module_name` 字段， 需提供给相关部署人员
