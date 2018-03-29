# BFF架构 简单的小记
------
本文是学AOP架构过程中，遇到的问题，和一些要注意的地方 ，首先我们要理解一些概念

	
> * AOP为面向切面编程，在传统的OOP开发过程中，对于一个模块我们分为数据访问层，逻辑层，Action层，jsp视图层，但是在多个模块
中需要加入日志管理、权限管理等非业务性功能的时候，就会使得代码存在大量的冗余，也不方便管理，这个时间就该使用AOP编程。
> * IOC 为控制反转，它是一种思想，把类的具体实现交给外部容器，而不是由类直接实例化，通过这个反转，把控制权交给了外部容器，
降低了类与类之间的耦合性。
> * DI为依赖注入，它是IOC的具体实现，它负责把类与类之间的依赖关系结合起来，有三种方式实现，接口注入，set注入，构造注入。

##BFF 架构
全称是Backends For Frontends(服务于前端的后端) 也就是服务器设计 API 时会考虑前端的使用，并在服务端直接进行业务逻辑的处理。
#####  适用场景
早期我们在设计系统 API 的时候，只是单纯地为前端（Web、Android、iOS 等等）提供一个模型（Model）的 JSON 序列化，并不会具体考虑前端的需求。如下是一个常规的 RESTful API，从设计上来说，它满足 RESTful API 的要求，但是并适合于前端使用。
在这种情况下，我们需要进行一些处理，如对文字的截断等等。而使用 BFF 则意味着，它会多出一层业务处理及转发层。

## NODE+KOA2+GULP
server 应用到 node+koa2 ，gulp做后台打包处理

## SWIG+WEBPACK4
服务器用swig 模版引擎， webpack4做前台打包处理

######开发中用到的相应的插件
koa ：Koa -- 基于 Node.js 平台的下一代 web 开发框架
koa-simple-router：路由
koa-swig：基于Swig的Koa视图渲染，支持标签，过滤器和扩展
koa-static：Koa静态文件指定中间件Koa-static
co：基于生成器的nod​​ejs和浏览器的控制流程良好性，使用promises，可以让您以非常好的方式编写非阻塞代码。	
log4js：日志管理
awilix：非常强大的依赖注入（DI）容器，用TypeScript编写。再次让IoC变得更好！
awilix-koa：Awilix助手，路由器和范围实例化Koa的中间件

######后台gulp 打包下载的依赖
gulp-rollup：主要在打包📦做 tree-shaking；
rollup-plugin-replace：打包时替换文件中的字符串

######webpack  打包下载的依赖
babel-plugin-transform-decorators-legacy:修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持
yargs-parser: 解析参数 插件
webpack-merge:合并对象
glop：匹配全局
postcss：css后处理器

//webpack
//yargs-parser. //解析参数 插件
//webpack-merge //解析参数 插件
//glob     手机全局变亮
//postcss
//postcss-cssnext
// npm install extract-text-webpack-plugin@next
//htmlAfterWebpackPlugin.js 编写插件
//html-webpack-plugin