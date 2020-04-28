var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  id: Number,
  title: String,
  overview: String,
  poster_path: String,
});

module.exports = mongoose.model('movies', movieSchema);
