var express = require('express');
var request = require('request');
var movieModel = require('../models/movies');
var router = express.Router();

// Retourne les films de themoviedb
router.get('/movies', function(req, res, next) {
  var urlApiMovies = "https://api.themoviedb.org/3/discover/movie?api_key=c8120db0dfeb3ff79b4f7f76431dfcd1&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  request(urlApiMovies, function(error, response, body) {
    body = JSON.parse(body);
    res.json({result: true, movies: body.results});
  });
});

// Retourne les filsm likés
router.get('/mymovies', function(req, res, next) {
  movieModel.find(function(error, data) {
    res.json({result: true, data});
  });
});

// Ajoute un film liké
router.post('/mymovies', function(req, res, next) {
  var newMovie = new movieModel({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    idMovieDB: req.body.idMovieDB
  });
  newMovie.save(function(error, movie) {
    res.json({result: true, movie});
  });
});

// Supprime un film liké
router.delete('/mymovies/:movieId', function(req, res, next) {
  movieModel.deleteOne({idMovieDB: req.params.movieId},
    function(error, response) {
      res.json({result: true});
  });
});

module.exports = router;
