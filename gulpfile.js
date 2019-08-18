// gulpfile.js
const path = require( 'path' );
const gulp = require( 'gulp' );
const {
    series,
    parallel
} = require( 'gulp' );
const {
    exec
} = require( 'child_process' );

const pug = require( 'gulp-pug' );
const sass = require( 'gulp-sass' );

// client souce
APP_DIR = path.join( __dirname, 'app' );
CLIENT_DIR = path.join( APP_DIR, 'client' );

CLIENT_SRC = path.join( CLIENT_DIR, 'src' );
PUG_INC = path.join( CLIENT_SRC, 'inc' );
PUG_PATHS = [ CLIENT_SRC, PUG_INC ];
SCSS_SRC = path.join( CLIENT_SRC, 'scss' );
CLIENT_IMG = path.join( CLIENT_DIR, 'img' );

// asset folder
PUBLIC_PATH = path.join( __dirname, 'docs' );
PUBLIC_CSS = path.join( PUBLIC_PATH, 'css' );
PUBLIC_JS = path.join( PUBLIC_PATH, 'js' );
PUBLIC_IMG = path.join( PUBLIC_PATH, 'img' );

INDEX_PUG = path.join( CLIENT_SRC, 'index.pug' );
PUG_FILEMASK = PUG_PATHS.map( p => path.join( p, '*.pug' ) );

function clean() {
    return exec( 'rm -rf ./docs' );
}

function copy_img () {
    copy_cmd = 'cp -r %s %s', CLIENT_IMG, PUBLIC_IMG;
    console.log( copy_img );

    // return exec(  );
}

async function buildHTML() {
    return gulp.src( INDEX_PUG )
        .pipe( pug( {} ) )

        .pipe( gulp.dest( PUBLIC_PATH ) );
    // console.log( "helloworld" );
};

async function helloworld() {
    console.log( "helloworld" );
}

async function sass_compile() {
    return gulp.src( path.join( SCSS_SRC, 'landing-page.scss' ) )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( PUBLIC_CSS ) );
}


exports.default = series( clean, buildHTML );
exports.w = () => {
    gulp.watch( PUG_FILEMASK, series( clean, buildHTML, copy_img ) );
    gulp.watch( path.join( SCSS_SRC, 'landing-page.scss' ), series( sass_compile ) );
}
