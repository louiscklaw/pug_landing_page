//
var express = require( 'express' )
const app = express()

app.use(express.static('docs'))


app.listen( 8081, function () {
    console.log( 'started' );
} )
