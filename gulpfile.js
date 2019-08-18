// gulpfile.js
const path = require( 'path' );
const gulp = require( 'gulp' );
const { series, parallel } = require('gulp');
const { exec } = require('child_process');

const pug = require( 'gulp-pug' );
const sass = require( 'gulp-sass' );

CWD = __dirname;
PUG_SRC = path.join( CWD, 'src' );
PUG_INC = path.join( CWD, 'inc' );
PUG_PATHS = [PUG_SRC, PUG_INC];
PUG_FILEMASK = PUG_PATHS.map( p => path.join( p, '*.pug' ));
INDEX_PUG = path.join( PUG_SRC, 'index.pug' );

PUBLIC_PATH = path.join(CWD, 'docs');;


function clean() {
    return exec('rm -rf ./docs');
}

async function buildHTML() {
    return gulp.src( INDEX_PUG )
        .pipe( pug( {} ) )

        .pipe( gulp.dest( PUBLIC_PATH ) );
    // console.log( "helloworld" );
};

async function helloworld () {
    console.log( "helloworld" );
}

async function sass_compile() {
  return gulp.src( '/home/logic/_workspace/pug_landing_page/src/scss/landing-page.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( '/home/logic/_workspace/pug_landing_page/docs/css' ) );
}


exports.default = series( clean, buildHTML );
exports.w = () => {
  gulp.watch( PUG_FILEMASK, series( clean, buildHTML ) );
  gulp.watch( '/home/logic/_workspace/pug_landing_page/src/scss/landing-page.scss', series( sass_compile ) );
}
