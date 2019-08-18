// gulpfile.js
const path = require( 'path' );
const gulp = require( 'gulp' );
const { series, parallel } = require('gulp');
const { exec } = require('child_process');

const pug = require( 'gulp-pug' );
const sass = require( 'gulp-sass' );

APP_DIR = path.join( __dirname, 'app' );
CLIENT_DIR = path.join( APP_DIR, 'client' );
CLIENT_SRC = path.join( CLIENT_DIR, 'src' );
PUG_INC = path.join( CLIENT_SRC, 'inc' );
PUG_PATHS = [CLIENT_SRC, PUG_INC];
PUG_FILEMASK = PUG_PATHS.map( p => path.join( p, '*.pug' ));
INDEX_PUG = path.join( CLIENT_SRC, 'index.pug' );

SCSS_SRC = path.join( CLIENT_SRC, 'scss' );

PUBLIC_PATH = path.join( __dirname, 'docs' );
PUBLIC_CSS = path.join( PUBLIC_PATH, 'css' );
PUBLIC_JS = path.join( PUBLIC_PATH, 'js' );


function clean() {
    return exec('rm -rf ./docs');
}

function re_create () {
    return exec( 'mkdir ./docs' );
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
  return gulp.src( path.join(SCSS_SRC,'landing-page.scss') )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( '/home/logic/_workspace/pug_landing_page/docs/css' ) );
}


exports.default = series( clean, buildHTML );
exports.w = () => {
    gulp.watch( PUG_FILEMASK, series( clean, re_create, buildHTML ) );
    gulp.watch( path.join(PUBLIC_CSS, 'landing-page.scss'), series( sass_compile ) );
}
