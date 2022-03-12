const express = require('express');
const cors = require('cors');

const app = express();

const protocol = process.env.PROTOCOL || 'https';
const port = process.env.PORT || '3001';
const host = process.env.HOST || 'localhost';

app.use(express.json());
app.use(cors());
app.use('/', require('./route/booksRoute'));
app.use(function (error, req, res, next) {
  if (error.message == 'Book not found') {
    res.status(404).send(error.message);
  }
  if (error.message == 'No books found') {
    res.status(404).send(error.message);
  }
  if (error.message == 'ISBN already exists') {
    res.status(409).send(error.message);
  }
  res.status(500).send(error.message);
});

app.listen(port, () => { 
  console.info(`Servidor disponível em ${host}:${port} via ${protocol}`)
})