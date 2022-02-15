const express = require('express');                                         //Importa o módulo express
const router = express.Router();                                            //Cria um roteador na variavel router
const booksService = require('../service/booksService');                    //Importa a camada de Serviços


//CRUD BASICO
router.get('/books', async function(req, res, next){                        //Leitura (vários livros)

    try {
        const books = await booksService.getBooks();
        res.json(books);
    } catch (event) {
        next(event);                                                            //chama o próximo middleware que é o tratamento de erro
    }

});

router.post('/books', async function (req, res, next){                      //Gravar um livro

    try {
        const book = req.body;                                                  //Pega o livro que chega na requisição
        const newBook = await booksService.saveBook(book);                      //Envia a requisição para a camada de serviço salvar o livro no banco de dados
        res.status(201).json(newBook);                                          //Devolve o newBook e o status 201 (CREATED)
    } catch (event) {
        next(event);                                                            //chama o próximo middleware que é o tratamento de erro
    }

})

router.delete('/books/:id', async function (req, res, next){                //Excluir um livro

    try {
        await booksService.deleteBook(req.params.id);                           //Chama o deleteBook usando o parametro ID que vem na requisicao.
        res.end();
    } catch (event) {
        next(event);                                                            //chama o próximo middleware que é o tratamento de erro
    }

});

router.put('/books/:id', async function (req, res, next){                   //Atualizar um livro

    try {
        const book = req.body;                                                  //Pega o livro que chega na requisição
        const updatedBook = await booksService.updateBook(req.params.id, book); //Envia a requisição para a camada de serviço atualizar o livro no banco de dados
        res.status(201).json(updatedBook);                                      //Devolve o updatedBook e o status 201 (VERIFICAR O STATUS)
    } catch(event) {
        next(event);                                                            //chama o próximo middleware que é o tratamento de erro
    }

})

module.exports = router;                                                    //Retorna o roteador a partir deste módulo