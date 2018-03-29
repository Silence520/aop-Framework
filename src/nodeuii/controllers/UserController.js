import { route, GET, POST, before } from 'awilix-koa';
@route('/users')
export default  class UserController{
	constructor({userService}){
		this.userService=userService;
	}
	@route('/:id')
	@GET()
	async getUser(ctx,next){
		const result= await this.userService.getDate(ctx.params.id);
    		ctx.body= await ctx.render('users/pages/index',{data:result})
	}


}



//DI. AOP. IOC
//bff 架构模式
//awilix-koa
//awilix
//babel-plugin-transform-decorators-legacy

//webpack
//yargs-parser. //解析参数 插件
//webpack-merge //解析参数 插件
//glob     手机全局变亮
//postcss
//postcss-cssnext
// npm install extract-text-webpack-plugin@next
//htmlAfterWebpackPlugin.js 编写插件
//html-webpack-plugin