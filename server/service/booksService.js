const booksData = require('../data/booksData');

exports.getBooks = function(){
    return booksData.getBooks();
};

exports.getBook = async function(id){
    const book = await booksData.getBook(id);
    if (!book) throw new Error('Book not found');
    return book;
};

exports.getBookByString = async function(string){
    const book = await booksData.getBookByString(string);
    if (book.length == 0) throw new Error('No books found');
    return book;
};

exports.saveBook = async function(book){
    const existingBook = await booksData.getBookByIsbn(book.isbn);
    if (existingBook) throw new Error('ISBN already exists');
    return booksData.saveBook(book);
};

exports.deleteBook = async function(id){
    return booksData.deleteBook(id);
};

exports.updateBook = async function(id, book){
    const getBook = await booksData.getBook(id);
    if (!getBook) throw new Error('Book not found');
    return booksData.updateBook(id,book);
};