const requestgent = require('supertest');
const app = require('../../build/app.js');
console.log(app);
function  request(argument) {
	return requestgent(app.listen())
}

describe('node 自动化测试',function(){
	describe('API 接口测试', function(){
		it('获取测试的数据',function(done){
			request()
			.get('/index/json')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
			.expect(200)
			.end(function(err,response){
				if(response.body.data=="123"){
					done()
				}else{
					done(new Error('接口测试与期望不符和'))
				}
			});
		});
	});
	describe('node容错处理', function(){
		it('获取测试404数据',function(done){
			request()
			.get('/index/error')
			.expect(404,done);
		});
	});
});
