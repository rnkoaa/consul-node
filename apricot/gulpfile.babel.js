"use strict";


import gulp from "gulp";
import del from "del";
import debug from "gulp-debug";
import inject from "gulp-inject";
import tsc from "gulp-typescript";
import tslint from "gulp-tslint";
import runSequence from "run-sequence";
import sourcemaps from 'gulp-sourcemaps';
const tsProject = tsc.createProject("tsconfig.json");

const paths = {
    pages: ["src/*.html"],
    static: [
        "src/public/js/lib",
        "src/public/css/**/*.css",
        "src/public/fonts/**/*.*",
        "src/public/images/**/*.png",
        "src/public/images/**/*.jpg"
    ]
};

gulp.task("copy-js", function() {
    return gulp.src("src/public/js/lib/**/*.js").pipe(gulp.dest("dist/public/js/"));
});

gulp.task("copy-config", function() {
    return gulp.src("config/*.json").pipe(gulp.dest("dist/config/"));
});
gulp.task("copy-env", function() {
    return gulp.src(".env").pipe(gulp.dest("dist/"));
});

gulp.task("lint-ts", function() {
    return gulp
        .src(["src/**/*.ts", "!src/test/*/**", "!src/components/**/*.js", "!src/components/node_modules/**/*.ts"])
        .pipe(
            tslint({
                formatter: "verbose"
            })
        )
        .pipe(tslint.report());
});

gulp.task("compile-ts", ["lint-ts"], function() {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

// gulp.task("watch", function() {
//     return gulp.watch(["src/**/*.ts", "!src/test/*/**}"], ["compile-ts"]);
// });

gulp.task("default", function(done) {
    // runSequence("clean", ["compile-ts", "copy-assets"]);
    runSequence("clean", ["compile-ts", "copy-env", "copy-config"]);
    done();
});

gulp.task("clean", function() {
    return del(["dist"]);
});

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
// gulp.task('gen-ts-refs', function () {
//     var target = gulp.src(config.appTypeScriptReferences);
//     var sources = gulp.src([config.allTypeScript], {read: false});
//     return target.pipe(inject(sources, {
//         starttag: '//{',
//         endtag: '//}',
//         transform: function (filepath) {
//             return '/// <reference path="../..' + filepath + '" />';
//         }
//     })).pipe(gulp.dest(config.typings));
// });

/**
 * Lint all custom TypeScript files.
 */
// gulp.task("ts-lint", function() {
//     return gulp
//         .src(config.allTypeScript)
//         .pipe(tslint())
//         .pipe(tslint.report("prose"));
// });

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 //  */
// gulp.task("compile-ts", function() {
//     var sourceTsFiles = [
//         config.allTypeScript, //path to typescript files
//         config.libraryTypeScriptDefinitions
//     ]; //reference to library .d.ts files

//     var tsResult = gulp
//         .src(sourceTsFiles)
//         .pipe(sourcemaps.init())
//         .pipe(tsc(tsProject));

//     tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
//     return tsResult.js.pipe(sourcemaps.write(".")).pipe(gulp.dest(config.tsOutputPath));
// });

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 //  */
// gulp.task("clean-ts", function(cb) {
//     var typeScriptGenFiles = [
//         config.tsOutputPath + "/**/*.js", // path to all JS files auto gen'd by editor
//         config.tsOutputPath + "/**/*.js.map", // path to all sourcemap files auto gen'd by editor
//         "!" + config.tsOutputPath + "/lib"
//     ];

//     // delete the files
//     del(typeScriptGenFiles, cb);
// });

// gulp.task("watch", function() {
//     gulp.watch([config.allTypeScript], ["ts-lint", "compile-ts"]);
// });
/*.js'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angularin20typescript',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './src',
      middleware: superstatic({ debug: false})
    }
  });
});*/

/*gulp.task('serve', ['compile-ts', 'watch'], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    files: ['index.html', /*'**/ //gulp.task(
//     "default",
//     ["ts-lint", "compile-ts"]
// );