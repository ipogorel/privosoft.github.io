var gulp = require('gulp');
var bundler = require('aurelia-bundler');

var config = {
  force: true,
  baseURL: '.',                   // baseURL of the application
  configPath: './config.js',      // config.js file. Must be within `baseURL`
  bundles: {
    "dist/app-build": {           // bundle name/path. Must be within `baseURL`. Final path is: `baseURL/dist/app-build.js`.
      includes: [
        '[**/*.js]',
        '**/*.html!text',
        '*.css!text'
      ],
      options: {
        inject: true,
        minify: false
      }
    },
    "dist/vendor-build": {
      includes: [
        "aurelia-framework",
        'aurelia-bootstrapper',
        'aurelia-fetch-client',
        'aurelia-router',
        'aurelia-animator-css',
        'aurelia-templating-binding',
        'aurelia-templating-resources',
        'aurelia-templating-router',
        'aurelia-loader-default',
        'aurelia-history-browser',
        'aurelia-logging-console',
        'fetch',
	      'pegjs',
        'lodash',
        'swagger-client',
        'jquery',
        'moment',
        'bootstrap/css/bootstrap.css!text',
        'bootstrap'
      ],
      options: {
        inject: true,
        minify: false
      }
    }
  }
};

gulp.task('bundle', ['clean', 'build'], function() {
  return bundler.bundle(config);
});

gulp.task('unbundle', function() {
  return bundler.unbundle(config);
});
