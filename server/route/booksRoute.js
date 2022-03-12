const express = require('express');
const router = express.Router();
const booksService = require('../service/booksService');

router.get('/books', async function(req, res, next){
    try {
        const books = await booksService.getBooks();
        res.json(books);
    } catch (event) {
        next(event);
    }
});

router.get('/books/:id', async function(req, res, next){
    try {
        if (!isNaN(req.params.id)){
            const book = await booksService.getBook(req.params.id);
            res.json(book);
        } else {
            const book = await booksService.getBookByString(req.params.id);
            res.json(book);
        }
    } catch (event) {
        next(event);
    }
});

router.get('/books/:title', async function(req, res, next){
    try {
        const book = await booksService.getBookByString(req.params.title);
        res.json(book);
    } catch (event) {
        next(event);
    }
});

router.post('/books', async function (req, res, next){
    try {
        const book = req.body;
        const newBook = await booksService.saveBook(book);
        res.status(201).json(newBook);
    } catch (event) {
        next(event);
    }
})

router.delete('/books/:id', async function (req, res, next){
    try {
        await booksService.deleteBook(req.params.id);
        res.end();
    } catch (event) {
        next(event);
    }
});

router.put('/books/:id', async function (req, res, next){
    try {
        const book = req.body;
        const updatedBook = await booksService.updateBook(req.params.id, book);
        res.status(201).json(updatedBook);
    } catch(event) {
        next(event);
    }
})

module.exports = router;