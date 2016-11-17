var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var myth = require('gulp-myth');

gulp.task('default',  function () {
    nodemon({
        script: 'server.js',
		verbose: true,
        ext: 'js',
        env: {
            PORT: 9000,
            SSL_PORT: 9443,
            ENABLE_REDIRECT: false,
            NODE_ENV: 'local-dev',
            ENVIRONMENT: 'development' // Types include development, qas & production
        },
        ignore: ['./node_modules/**', 'generated/*', 'app.js', 'controllers/*.js', 'directives/*.js', 'factories/*.js']
    })
	.on('restart', function () {
	    console.log('Changes Occured, Restarting');
	});
});