# vue 多页面项目

## 新建页面
在 `src/modules` 目录下新建文件夹，没有路由参照 `single` 示例，有路由参照 `multi` 示例，`文件夹名`用于 `开发` 和 `编译`
> 入口文件 `app.js 和 index.html` 不要更改

## 开发
`xxx` 为每个页面所在文件夹
```sh
$ npm run dev xxx
```
or
```sh
$ ./develop.sh xxx
```

## 编译
`xxx` 为每个页面所在文件夹
```sh
$ npm run build xxx
```
or
```sh
$ ./build.sh xxx
```

## 文件说明
`src` 下存放 公共文件  
`src/modules/` 下，单独页面使用的文件放在单独的模块内

## 目录结构
├── README.md  
├── browserslist  // 浏览器兼容列表，用于 autoprefixer  
├── build  // webpack 配置文件  
│   ├── entry.js  
│   ├── webpack.build.js  
│   ├── webpack.config.js  
│   └── webpack.dev.js  
├── build.sh // 编译脚本  
├── develop.sh // 开发脚本  
├── package.json  
├── src  
│   ├── components // 公共组件  
│   │   └── DConsole.vue // vConsole 组件  
│   ├── images  // 公告图片  
│   │   └── vue.png  
│   ├── modules  // 多页面模块文件夹，不同页面放入不同子目录中  
│   │   ├── multi  // 带路由示例  
│   │   │   ├── app.js  // 入口 js  
│   │   │   ├── app.vue  // 首页  
│   │   │   ├── images  // 私有图片  
│   │   │   │   └── vue.png  
│   │   │   ├── index.html  // 入口 html  
│   │   │   ├── pages  // 子页面  
│   │   │   │   └── page.vue  
│   │   │   ├── routes.js  // 路由  
│   │   │   └── service.js  // 私有 js  
│   │   └── single  // 单独页示例  
│   │       ├── app.js  // 入口 js  
│   │       ├── app.vue  // 首页  
│   │       ├── images  // 私有图片  
│   │       │   └── vue.png  
│   │       ├── index.html  // 入口 html  
│   │       └── service.js  // 私有 js  
│   ├── scss  // 公共 scss  
│   │   ├── _global.scss  // 全局变量等  
│   │   ├── component.scss  // 组件  
│   │   ├── layer.scss  // layer  
│   │   ├── layout.scss  // 集合  
│   │   ├── normalize.scss  
│   │   └── reset.scss  // 自定义  
│   └── service  // 公共 js  
│       ├── ajax  // ajax  
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
  




