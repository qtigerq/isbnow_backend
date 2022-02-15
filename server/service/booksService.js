const booksData = require('../data/booksData');                     //Importa a camada que controla o banco de dados (querys)

exports.getBooks = function(){                                      //Buscar todos os livros
    return booksData.getBooks();                                        //Retorna os dados de todos os livros cadastrados no banco de dados
};

exports.getBook = async function(id){                               //Buscar um livro pelo ID
    const book = await booksData.getBook(id);                           //Faz a busca do livro pelo ID
    if (!book) throw new Error('Book not found');                       //Se não existir, retorna dizendo que não foi encontrado
    return book;                                                        //Senão, retorna os dados do livro cadastrado no banco de dados
};

exports.saveBook = async function(book){                            //Salvar um livro
    const existingBook = await booksData.getBookByIsbn(book.isbn);      //Faz uma busca para verificar se o ISBN já está cadastrado no banco
    if (existingBook) throw new Error('ISBN already exists');           //Se existir, devolve erro dizendo que o ISBN já existe
    return booksData.saveBook(book);                                    //Senão, salva o livro no banco de dados
};

exports.deleteBook = async function(id){                            //Excluir um livro
    return booksData.deleteBook(id);                                    //Manda exclusao para a camada Data
};

exports.updateBook = async function(id, book){                      //Atualizar um livro
    const getBook = await booksData.getBook(id);                        //Procura pelo livro no banco de dados
    if (!getBook) throw new Error('Book not found');                    //Se não existir, retorna erro
    return booksData.updateBook(id,book);                               //Manda alteração para a camada Data
};