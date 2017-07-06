# vue 多页面项目

## 新建页面
在 `src/modules` 目录下新建文件夹，没有路由参照 `single` 示例，有路由参照 `multi` 示例，`文件夹名`用于 `开发` 和 `编译`
> 入口文件 `app.js` 和 `index.html` 文件名 不要更改

## 开发
### 启动单个模块服务
`xxx` 为每个页面所在文件夹
```sh
$ npm run dev xxx
```
or
```sh
$ ./develop.sh xxx
```
### 启动所有模块服务
将 `xxx` 替换为 `all`

### 浏览器访问
`host + port + xxx`  
```
http://localhost:2222/single
```


## 编译
`xxx` 为每个页面所在文件夹  
`type` 为项目用到的依赖类型，打包成 lib.js，参照 `module_lib.js`

e.g.
- 0 => vue
- 1 => vue + axios
- 2 => vue + vue-router
- 3 => vue + vue-router + axios

```sh
$ npm run build xxx type
```
or
```sh
$ ./build.sh xxx type
```

## 文件说明
`src` 下存放 公共文件  
`src/modules/xxx` 下，单独页面使用的文件放在单独的模块内  
`src/modules/xxx/service/service.js`, `src/scss/` 中引入的文件看情况引入  
