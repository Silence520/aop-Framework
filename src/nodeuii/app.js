import Koa from'koa';
import log4js from'log4js';
import config from'./config';
import router from'koa-simple-router';
import render from'koa-swig';
import co from'co';
import serve from'koa-static';
//aop
import { asClass, asValue ,createContainer,Lifetime} from'awilix';
import { loadControllers,scopePerRequest } from'awilix-koa';
import errorHandler from'./middlewares/errorHandler';
// import controllerInit from'./controllers/controllerInit';

const app = new Koa();
//ioc 的创建容器
const container = createContainer()
//swig 配置
app.context.render = co.wrap(render({
  	root: config.viewdir,
	autoescape: true,
  	cache: 'memory', // disable, set to false 
  	ext: 'html',
  	writeBody: false
}));

//配置静态资源文件夹
app.use(serve(config.staticDir));

//log 错误处理配置
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'logs/yodeng.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
//log处理
const logger = log4js.getLogger('cheese');
errorHandler.error(app,logger);
//router  del
// controllerInit.getAllRiuters(app,router);

//每一个请求都是一个 new model
app.use(scopePerRequest(container));
//装载所有的models 并将services 注入到 controllers
container.loadModules([`${__dirname}/services/*.js`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})

//注册所有的路有
app.use(loadControllers(`controllers/*.js`, { cwd: __dirname }))

app.listen(config.port,()=>{
	console.log('server is runing...')
});


module.exports= app;