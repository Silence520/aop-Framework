const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
//提取css
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//自己编写插件
const htmlAfterWebpackPlugin = require("./config/htmlAfterWebpackPlugin");
//通过打包环境配置获取相应的config配置
const _mergeConfig=require(`./config/webpack.${argv.mode}.js`);
const glob=require('glob');
//同步获取需要的js
const files=glob.sync('./src/webapp/views/**/*.entry.js');
const {join, basename}=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//copy代码
const CopyWebpackPlugin = require('copy-webpack-plugin');

// console.log(files)
 let _entry={};

 //循环处理得到需要的文件格式
 for(let item of files){
 	item.replace(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g, (mactch, $1) => { _entry[$1] = item });
 }
console.log(_entry)
let webpackConfig={
	entry:_entry,
	module:{
		rules: [{
			           test: /\.css$/,
			            exclude: /node_modules/,
			            use: ExtractTextPlugin.extract({
				            fallback: "style-loader",
				            use: [{
				           		loader: 'postcss-loader',
				            }]
		         		})
			}]
	},
	output:{
		path:join(__dirname,'./dist/assets'),
		publicPath:'/',
	},
	plugins:[
		new CopyWebpackPlugin([
		 { from: 'src/webapp/views/common/layout.html', to: '../views/common/layout.html' },
		 { from: 'src/webapp/widgets/pagefooter/pagefooter.html', to: '../widgets/pagefooter/pagefooter.html' },
		 { from: 'src/webapp/widgets/topbanner/topbanner.html', to: '../widgets/topbanner/topbanner.html' }
		 ]),
		new HtmlWebpackPlugin({
      			filename: '../views/hello/pages/index.html',
      			template: 'src/webapp/views/hello/pages/index.html',
      			inject:false
    		}),
		new HtmlWebpackPlugin({
      			filename: '../views/users/pages/index.html',
      			template: 'src/webapp/views/users/pages/index.html',
      			inject:false
    		}),
		new htmlAfterWebpackPlugin()

	]
};

module.exports=merge(_mergeConfig,webpackConfig);