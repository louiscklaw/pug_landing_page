// gulpfile.js
const path = require( 'path' );
const gulp = require( 'gulp' );
const { series, parallel } = require('gulp');
const { exec } = require('child_process');

var pug = require( 'gulp-pug' );

CWD = __dirname;
PUG_SRC = path.join( CWD, 'src' );
PUG_INC = path.join( CWD, 'inc' );
PUG_PATHS = [PUG_SRC, PUG_INC];
PUG_FILEMASK = PUG_PATHS.map( p => path.join( p, '*.pug' ));

PUBLIC_PATH = path.join(CWD, 'docs');;


function clean() {
    return exec('rm -rf ./docs');
}

async function buildHTML() {
    return gulp.src( PUG_FILEMASK )
        .pipe( pug( {} ) )
        .pipe( gulp.dest( PUBLIC_PATH ) );
    // console.log( "helloworld" );
};

async function helloworld () {
    console.log( "helloworld" );
}

exports.default = series( clean, buildHTML );
exports.w = () => {
    gulp.watch( PUG_FILEMASK, series(clean, buildHTML) );
}
