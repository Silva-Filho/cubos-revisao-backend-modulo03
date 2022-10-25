require( "dotenv" ).config( { path: "./src/env/.env" } );

const express = require( "express" );

const { router } = require( "./router" );

const port = 8888;

const server = express();

server.use( express.json() );
server.use( router );

server.listen( port, () => {
    console.log( `O servidor está rodando na porta ${ port }.` );
} );
