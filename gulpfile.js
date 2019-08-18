// gulpfile.js

var gulp = require( 'gulp' );
const { series, parallel } = require('gulp');
const { exec } = require('child_process');

var pug = require( 'gulp-pug' );

PUG_PATH = '/home/logic/_del/test_new_portfolio/src';
PUG_DEST_PATH = '/home/logic/_del/test_new_portfolio/docs';

function clean() {
    return exec('rm -rf ./docs');
}

async function buildHTML() {
    return gulp.src( PUG_PATH + '/*.pug' )
        .pipe( pug( {} ) )
        .pipe( gulp.dest( PUG_DEST_PATH ) );
    // console.log( "helloworld" );
};

async function helloworld () {
    console.log( "helloworld" );
}

exports.default = series( clean, buildHTML );
