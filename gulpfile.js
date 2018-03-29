var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var rollup = require('gulp-rollup');
var replace=require('rollup-plugin-replace');
var JSON5=require('json5');

gulp.task('gulpdev', () =>{
	return  gulp.watch('./src/nodeuii/**/*.js',  ()=> {
	             gulp.src('./src/nodeuii/**/*.js')
                 		  .pipe(babel({
                 		  	"babelrc":false,
                 		  	"plugins": [
                                                "transform-decorators-legacy",
                                                "transform-es2015-modules-commonjs"
                                                ]
	                   	}))
	              .pipe(gulp.dest('dist'))
	 });
}
);


gulp.task('gulpprod', () =>{
                        gulp.src('./src/nodeuii/**/*.js')
                 	.pipe(babel({
                 		  	"babelrc":false,
                 		  	"plugins": [
                                                "transform-decorators-legacy",
                                                "transform-es2015-modules-commonjs"
                                                ]
	             }))
	.pipe(gulp.dest('dist'));
});

gulp.task('gulpconfig', () =>{
                        gulp.src('./src/nodeuii/**/*.js')
                         .pipe(rollup({
                               output:{
                                format:'cjs'
                               },
                               input: './src/nodeuii/config/index.js',
                               plugins:[
                                        replace({
                                            "process.env.NODE_ENV" :JSON.stringify("production")
                                        })
                               ]
                         }))
                     .pipe(gulp.dest('dist'))
});

console.log(process.env.NODE_ENV)








