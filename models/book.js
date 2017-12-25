var mongoose = require('mongoose');

//Genre Schema
var bookSchema= mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  publisher: {
    type: String,
  },
  pages: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})


var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback, limit) {
  // console.log('again2');
  Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id, callback) {
  // console.log('again2');
  Book.findById(id, callback);
}

//Add Book
module.exports.addBook = function(book, callback) {
  Book.create(book, callback);
}

//Update Book
module.exports.updateBook = function(id, book, options, callback) {
  var query = {_id: id}
  var update = {
    title: book.title
  }
  Book.findOneAndUpdate(query, update, options, callback);
}

//Delete Book
module.exports.deleteBook = function(id, callback) {
  var query = {_id: id}
  Book.remove(query, callback);
}
