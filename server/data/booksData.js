const database = require('../infra/database');                          //Importa a camada de conexão com o banco de dados.

exports.getBooks = function(){                                          //Buscar todos os livros
    return database.query('select * from bookstore.books');
};

exports.getBook = function(id){                                         //Buscar um livro pelo ID.
    return database.oneOrNone('select * from bookstore.books where id = $1', [id]);
};

exports.getBookByIsbn = function(isbn){                                 //Buscar um livro pelo ISBN (usado para salvar novos livros).
    return database.oneOrNone('select * from bookstore.books where isbn = $1', [isbn]);
};

exports.saveBook = function(book){                                      //Salvar um livro;  .one (espero que volte algo) [returning: para retornar o que foi gravado no banco]
    return database.one('insert into bookstore.books (isbn, title, authors, category, imprint, lang, pages, publi_year) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *', [book.isbn, book.title, book.authors, book.category, book.imprint, book.lang, book.pages, book.publi_year]);
};

exports.deleteBook = function(id){                                      //Deletar um livro; .none (é pra não retornar nada)
    return database.none('delete from bookstore.books where id = $1', [id]);
}

exports.updateBook = function(id, book){                                //Atualizar um livro; .one (espero que volte algo) [returning: para retornar o que foi gravado no banco]
    return database.one('update bookstore.books set isbn = $1, title = $2, authors = $3, category = $4, imprint = $5, lang = $6, pages = $7, publi_year = $8 where id = $9 returning *', [book.isbn, book.title, book.authors, book.category, book.imprint, book.lang, book.pages, book.publi_year, id]);
}