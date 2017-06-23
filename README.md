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
- 1 => vue && axios
- 2 => vue && vue-router
- 3 => vue && vue-router && axios

```sh
$ npm run build xxx type
```
or
```sh
$ ./build.sh xxx type
```

## 文件说明
`src` 下存放 公共文件  
`src/modules/xxx/service/service.js`, `src/scss/` 中引入的文件看情况引入

## 目录结构
.
├── README.md  
├── browserslist  // 浏览器兼容列表，用于 autoprefixer  
├── build  // webpack 配置文件  
│   ├── entry.js  
│   ├── module_lib.js  
│   ├── webpack.build.js  
│   ├── webpack.config.js  
│   └── webpack.dev.js  
├── build.sh // 编译脚本  
├── develop.sh // 开发脚本  
├── package.json  
├── src  
│   ├── components // 公共组件  
│   │   └── DConsole.vue // vConsole 组件  
│   ├── images   
│   │   └── vue.png  
│   ├── modules  // 多页面模块文件夹，不同页面放入不同子目录中  
│   │   ├── multi  // 带路由示例  
│   │   │   ├── app.js  // 入口 js  
│   │   │   ├── images  // 私有图片  
│   │   │   │   └── vue.png  
│   │   │   ├── index.html  // 入口 html  
│   │   │   ├── pages  // 页面  
│   │   │   │   ├── app.vue  
│   │   │   │   └── page.vue  
│   │   │   ├── router  // 路由  
│   │   │   │   └── routes.js  
│   │   │   └── service  // 私有 js  
│   │   │       └── service.js  
│   │   └── single  // 单独页示例  
│   │       ├── app.js  // 入口 js  
│   │       ├── app.vue  // 主页  
│   │       ├── images  // 私有图片  
│   │       │   └── vue.png  
│   │       ├── index.html  // 入口 html  
│   │       └── service  // 私有 js  
│   │           └── service.js  
│   ├── scss  // 公共 scss  
│   │   ├── _global.scss  // 全局变量等  
│   │   ├── component.scss  // 组件  
│   │   ├── layer.scss  // layer  
│   │   ├── layout.scss  // 集合  
│   │   ├── normalize.scss  
│   │   └── reset.scss  // 自定义  
│   └── service  // 公共 js  
│       ├── ajax  // axios  
│       │   ├── _global.js  // axios 配置  
│       │   └── ajax.js  // 封装的 ajax  
│       ├── layer.js  // layer 弹框  
│       ├── rem.js  // rem 适配  
│       ├── storage.js  // localStorage cookie  
│       ├── tcheck.js  // 类型检查  
│       ├── title.js  // 修改 title  
│       ├── tool.js  // 其他  
│       └── validate.js  // 验证  
├── static  
│   └── vconsole.min.js  
└── task.todo  
