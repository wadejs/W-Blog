## W-Blog

W-Blog是一个基于vue和node的小小小博客
前端用vue，后端用egg.js

## 快速入门

### 技术栈

- 前端： 
  - 用户端：[vue](https://cn.vuejs.org/)、[iview](https://www.iviewui.com) 
  - admin端：[vue](https://cn.vuejs.org/)、[d2admin](https://github.com/d2-projects/d2-admin)、[element](http://element-cn.eleme.io/#/zh-CN) 
- 后端: [egg.js](https://eggjs.org/zh-cn/)、[mongodb](https://www.mongodb.com/)

### 功能特性

- 轻量级Markdown编辑器，图片上传七牛
- 支持标签、分类、搜索草稿箱等功能
- 标签云
### 线上地址
  [煌哥哥的博客](http://blog.wadejs.cn/)
### 图片演示
#### 前台
- 首页浏览
![1.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-1.gif)
- 文章详情浏览及目录导航
![2.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-2.gif)
- 可根据分类和标签搜索文章
![3.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-3.gif)
- 输入关键词搜索
![4.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-4.gif)
- 标签云及搜索
![5.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-5.gif)
#### 后台
- 后台登录
![6.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-6.gif)
- 文章列表
![7.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-7.gif)
- 文章搜索
![8.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-8.gif)
- 文章编辑
![9.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-9.gif)
- 增加分类
![10.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-10.gif)
- 增加标签
![11.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-11.gif)
- 标签修改（分类一样）
![12.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-12.gif)
- 文章修改
![13.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-13.gif)
- 文章删除，支持垃圾箱草稿箱
![14.gif](http://pdc4osljo.bkt.clouddn.com/blog-md-14.gif)

### 目录结构

```
│  .autod.conf.js
│  .eslintignore
│  .eslintrc
│  .gitignore
│  .travis.yml
│  app.js // 项目启动前执行，比如写入管理员
│  appveyor.yml
│  package.json
│  README.md
│
├─app
│  │  router.js // 服务端路由
│  │
│  ├─controller
│  │      admin.js // 后台相关controller
│  │      client.js // 前台相关controller
│  │      login.js // 登录相关controller
│  │      page.js // 页面相关controller
│  │
│  ├─extend
│  │      helper.js
│  │
│  ├─middleware
│  │      auth.js // 登录验证中间件
│  │
│  ├─model
│  │      Article.js // 文章model
│  │      Category.js // 分类model
│  │      Tag.js // 标签model
│  │      User.js // 用户model
│  │
│  ├─public
│  │  │
│  │  ├─admin // admin端
│  │  │  ├─dist // 打包生成后的目录
│  │  │  └─src // admin端源文件
│  │  │
│  │  └─client // 用户端
│  │      ├─dist // 打包生成后的目录
│  │      └─src // 用户端源文件
│  │
│  └─service // service部分用来执行具体的操作
│          admin.js
│          client.js
│          login.js
│
├─config
│      config.default.js // 项目配置相关
│      plugin.js
│
└─test // 测试相关
    └─app
        └─controller
                home.test.js
```  

### 全局配置

```javascript
module.exports = appInfo => {
  return {
    keys: appInfo.name + '_1432030565447_3632',
    mongoose: {
      clients: {
        blog: {
          url: 'mongodb://127.0.0.1/blog',
          options: {
            user: 'test', // 数据库的用户名 
            pass: 'test' // 数据库的密码
          },
        }
      }
    },
    // 初始化管理员信息
    user: {
      userName: 'admin',
      password: 'admin',
    },
    session: {
      maxAge: 3600 * 1000,
    },
    jwt: {
      cert: 'jsonwebtoken' // jwt秘钥
    },
    /**
     * markdown编辑器的图片上传用的是七牛存储
     * 所以需要配置七牛的key
     */
    qiniu: { // 这里填写你七牛的Access Key和Secret Key
      ak: '',
      sk: ''
    }
  }
};
```


### 本地运行

安装[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)数据库和[Node.js](https://nodejs.org/en/)环境。

``` bash
# 安装服务端依赖
npm install
# 开启mongodb
mongod --dbpath '你数据库的目录' # --auth 如果开启密码，要加上这个命令
# 运行服务
npm run dev

# 进入前台目录
cd ./app/public/client/src
# 安装前台依赖
npm install
# 运行前台项目
npm run dev

# 进入后台目录
cd ./app/public/admin/src
# 安装后台依赖
npm install
# 运行后台项目
npm run dev

# 即可通过 http://127.0.0.1:8080访问
# 开发阶段直接通过webpack的devserver访问
# 代理请求已经配置好，可在config下配置proxyTable更改
```

### 打包

```bash
# 在前台和后台目录分别
npm run build
# 在项目根目录
npm install --production
# 启动
npm start
# 打包后可以通过
# http://127.0.0.1:7001/  和 http://127.0.0.1:7001/admin 来访问前台和后台
```


 
