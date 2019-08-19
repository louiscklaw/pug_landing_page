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
PUG_INC = path.join( CLIENT_SRC, 'pug_inc' );
SCSS_SRC = path.join( CLIENT_SRC, 'scss' );
CLIENT_IMG = path.join( CLIENT_DIR, 'img' );

// asset folder
PUBLIC_PATH = path.join( __dirname, 'docs' );
PUBLIC_CSS = path.join( PUBLIC_PATH, 'css' );
PUBLIC_JS = path.join( PUBLIC_PATH, 'js' );
PUBLIC_IMG = path.join( PUBLIC_PATH, 'img' );

INDEX_PUG = path.join( CLIENT_SRC, 'index.pug' );


// build config
PUG_PATHS = [ CLIENT_SRC, PUG_INC ];
SCSS_PATHs = [SCSS_SRC]
PUG_FILEMASK = PUG_PATHS.map( p => path.join( p, '*.pug' ) );

// i think it is easier if i implement it using fabric
async function clean_public_dir() {
    return exec( `rm -rf ${PUBLIC_PATH}` );
}

async function mkdir_public_dir () {
    return exec( `mkdir -p ${PUBLIC_PATH}` );
}

async function mkdir (dir_path) {
    return exec( 'mkdir -p '+ dir_path);
}

async function copy_img () {
    return exec('cp ./app/client/src/img/* ./docs/img/');
}

async function re_privision_public_dir () {
    await clean_public_dir();
    await mkdir_public_dir();
    await mkdir( PUBLIC_PATH );
    await mkdir( PUBLIC_IMG );
    await mkdir( PUBLIC_CSS );
    await copy_img();
}

async function buildHTML() {
    return gulp.src( INDEX_PUG )
        .pipe( pug( {} ) )
        .pipe( gulp.dest( PUBLIC_PATH ) );
    // console.log( "helloworld" );
};

async function sass_compile () {
    console.log( SCSS_SRC );
    return gulp.src( path.join( SCSS_SRC, 'landing-page.scss' ) )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( PUBLIC_CSS ) );
}

async function helloworld() {
    console.log( "helloworld" );
}

default_task = series( re_privision_public_dir, buildHTML, sass_compile);

exports.default = default_task;
exports.sass = sass_compile;
exports.w = () => {
    gulp.watch( PUG_FILEMASK, default_task );
    gulp.watch( SCSS_PATHs, default_task );
}
