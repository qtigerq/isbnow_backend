const express = require('express');                         //Importa o módulo Express
const cors = require('cors');                               //Para gerir conflitos de requisições
const app = express();                                      //Instancia a função do express na constante app
const port = 3001;

//middlewares
app.use(express.json());                                    //Converte as requisiçõs res.body para json.
app.use(cors());                                            //Gerente de conflitos de requisições



app.use('/', require('./route/booksRoute'));                //Delega para postRoute o tratamento das requisições que chegarem em '/'

app.use(function(error, req, res, next){                    //Tratamento de erros (error handler)

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

app.listen(port, () => {                                    //Abre o servidor na porta 3001
    console.log(`Servidor disponível em http://localhost:${port}`)
  })