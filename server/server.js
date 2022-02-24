const express = require('express');                         //Importa o módulo Express
//const chalk = require('chalk');
const cors = require('cors');                               //Para gerir conflitos de requisições
const fs = require('fs');

const pkg = require('./../package.json');

const app = express();                                      //Instancia a função do express na constante app

let server;

const start = Date.now();
const protocol = process.env.PROTOCOL || 'https';
const port = process.env.PORT || '3001';
const host = process.env.HOST || 'localhost';

function sendBootStatus(status) {
  // don't send anything if we're not running in a fork
  if (!process.send) {
    return;
  }
  process.send({ boot: status });
}

//middlewares
app.use(express.json());                                    //Converte as requisiçõs res.body para json.
app.use(cors());                                            //Gerente de conflitos de requisições

app.use('/', require('./route/booksRoute'));                //Delega para postRoute o tratamento das requisições que chegarem em '/'

app.use(function (error, req, res, next) {                    //Tratamento de erros (error handler)

  if (error.message == 'Book not found') {
    res.status(404).send(error.message);                      //Finaliza devolvendo status e mensagem para o client
  }
  if (error.message == 'No books found') {
    res.status(404).send(error.message);                      //Finaliza devolvendo status e mensagem para o client
  }
  if (error.message == 'ISBN already exists') {
    res.status(409).send(error.message);                      //Finaliza devolvendo status e mensagem para o client
  }

  res.status(500).send(error.message);                        //Caso não seja nenhum dos erros acima, devolve erro 500.

});

console.log(
  ( '%s booted in %dms - %s://%s:%s' ),
  pkg.name,
  Date.now() - start,
  protocol,
  host,
  port
);



// Start a development HTTPS server.
if ( protocol === 'https' ) {

	const { execSync } = require( 'child_process' );

	const execOptions = { encoding: 'utf-8', windowsHide: true };
	let key = './../certs/key.pem';
  
	let certificate = './../certs/certificate.pem';
	
	if (!fs.existsSync(key) || !fs.existsSync(certificate)) {
		try {
			execSync( 'openssl version', execOptions );
			execSync(
				`openssl req -x509 -newkey rsa:2048 -keyout ./../certs/key.tmp.pem -out ${ certificate } -days 365 -nodes -subj "/C=US/ST=Foo/L=Bar/O=Baz/CN=localhost"`,
				execOptions
			);
			execSync( `openssl rsa -in ./../certs/key.tmp.pem -out ${ key }`, execOptions );
			execSync( 'rm ./../certs/key.tmp.pem', execOptions );
		} catch ( error ) {
			console.error( error );
		}
	}

	const options = {
	     key: fs.readFileSync( key ),
	     cert: fs.readFileSync( certificate ),
	     passphrase : 'odiseia'
        };
    
	server = require( 'https' ).createServer( options, app );
    
} else {
    server = require( 'http' ).createServer( app );
}

server.listen( { port, host }, function() {
    // Tell the parent process that Server has booted.
    sendBootStatus( 'ready' );
} );







/*
app.listen(port, () => {                                    //Abre o servidor na porta 3001
  console.info(`Servidor disponível em http://localhost:${port}`)
})
*/