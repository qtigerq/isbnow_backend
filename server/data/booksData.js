const database = require('../infra/database');

exports.getBooks = function(){
    return database.query('select * from bookstore.books');
};

exports.getBook = function(id){
    return database.oneOrNone('select * from bookstore.books where id = $1', [id]);
};

exports.getBookByString = function(string){
   return database.manyOrNone(`select * from bookstore.books where title like '%${string}%' or authors like '%${string}%'`);
};

exports.getBookByIsbn = function(isbn){
    return database.oneOrNone('select * from bookstore.books where isbn = $1', [isbn]);
};

exports.saveBook = function(book){
    return database.one('insert into bookstore.books (isbn, title, authors, category, imprint, lang, pages, publi_year) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *', [book.isbn, book.title, book.authors, book.category, book.imprint, book.lang, book.pages, book.publi_year]);
};

exports.deleteBook = function(id){
    return database.none('delete from bookstore.books where id = $1', [id]);
}

exports.updateBook = function(id, book){
    return database.one('update bookstore.books set isbn = $1, title = $2, authors = $3, category = $4, imprint = $5, lang = $6, pages = $7, publi_year = $8 where id = $9 returning *', [book.isbn, book.title, book.authors, book.category, book.imprint, book.lang, book.pages, book.publi_year, id]);
}