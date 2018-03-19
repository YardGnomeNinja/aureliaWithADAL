import {CLIOptions} from 'aurelia-cli';
import * as browserSync from 'browser-sync';
import * as child_process from 'child_process';
import * as del from 'del';
import * as gulp from 'gulp';
import * as historyApiFallback from 'connect-history-api-fallback/lib';
import * as os from 'os';
import * as project from '../aurelia.json';
import * as tsConfig from '../../tsconfig.json';
import * as typescript from 'gulp-typescript';

import { webdriver_update, protractor } from 'gulp-protractor';

function build() {
  var typescriptCompiler = typescriptCompiler || null;
  
  if ( !typescriptCompiler ) {

    delete tsConfig.compilerOptions.lib;
    
    typescriptCompiler = typescript.createProject(Object.assign({}, tsConfig.compilerOptions, {
      // Add any special overrides for the compiler here
      module: 'commonjs'
    }));
    
  }

  return gulp.src(project.e2eTestRunner.typingsSource.concat(project.e2eTestRunner.source))
    .pipe(typescript(typescriptCompiler))
    .pipe(gulp.dest(project.e2eTestRunner.dist));
}

function clean() {
  return del(project.e2eTestRunner.dist + '*');
}

// run end to end tasks
// using Protractor: http://angular.github.io/protractor/
function e2e() {
  gulp
    .src(project.e2eTestRunner.dist + '**/*.js')
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:9000']
    }))
    .on('end', function() { process.exit(); })
    .on('error', function(e) { throw e; } )
}

// defines build and serve via browserSync
let serve = gulp.series(
  build,
  done => {
    browserSync({
      online: false,
      open: false,
      port: 9000,
      logLevel: 'silent',
      server: {
        baseDir: ['.'],
        middleware: [historyApiFallback(), function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }]
      }
    }, function (err, bs) {
      let urls = bs.options.get('urls').toJS();
      console.log(`Application Available At: ${urls.local}`);
      console.log(`BrowserSync Available At: ${urls.ui}`);
      done();
    });
  }
);

export default gulp.series(
  webdriver_update,
  clean,
  serve,
  e2e
);