var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre')
Book = require('./models/book')

//Connect to mongoose
mongoose.connect('mongodb://whatsmusicadmin:password@ds163226.mlab.com:63226/whatsmusic', { useMongoClient: true })

// mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res) {
  res.send('Hello World! Welcome to my Bookstore app.');
});

app.get('/api', function(req, res) {
  res.send('Sorry nothing is here yet!');
});

//Genres section
app.get('/api/genres', function(req, res) {
  Genre.getGenres(function(err, genres){
    if (err) {
      throw err;
    }
    res.json(genres);
  })
});

app.post('/api/genres', function(req, res) {
  var genre = req.body;
  Genre.addGenre(genre, function(err, genre){
    if (err) {
      throw err;
    }
    res.json(genre);
  })
});

app.put('/api/genres/:_id', function(req, res) {
  var id = req.params._id
  var genre = req.body;
  Genre.updateGenre(id, genre, {}, function(err, genre){
    if (err) {
      throw err;
    }
    res.json(genre);
  })
});

app.delete('/api/genres/:_id', function(req, res) {
  var id = req.params._id
  Genre.deleteGenre(id, function(err, genre){
    if (err) {
      throw err;
    }
    res.json(genre);
  })
});

//Books section
app.get('/api/books', function(req, res) {
  Book.getBooks(function(err, books){
    if (err) {
      throw err;
    }
    res.json(books);
  })
});

app.post('/api/books', function(req, res) {
  var book = req.body;
  Book.addBook(book, function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  })
});

app.put('/api/books/:_id', function(req, res) {
  var id = req.params._id
  var book = req.body;
  Book.updateBook(id, book, {}, function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  })
});

app.get('/api/books/:_id', function(req, res) {
  Book.getBookById(req.params._id, function(err, book){
    console.log('inside');
    if (err) {
      throw err;
    }
    res.json(book);
  })
});

app.delete('/api/books/:_id', function(req, res) {
  var id = req.params._id
  Book.deleteBook(id, function(err, book){
    if (err) {
      throw err;
    }
    res.json(book);
  })
});


app.listen(process.env.PORT || 5000);

console.log('Running on port 5000');
