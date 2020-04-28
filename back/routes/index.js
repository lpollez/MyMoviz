require('dotenv').config();
var express = require('express');
var request = require('request');
var movieModel = require('../models/movies');
var router = express.Router();

// get movies from themoviedb with first Youtube trailer
router.get('/movies', function (req, res, next) {
  let urlApiMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&video=false&page=1`;
  request(urlApiMovies, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      if (body.results) {
        const promises = body.results.map(movie => {
          return new Promise(resolve => {
            const idMovie = movie.id;
            let trailerYoutubeKey = '';
            urlApiMovies = `http://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`;
            request(urlApiMovies, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                trailer =
                  body.results &&
                  body.results.find(
                    trailer =>
                      trailer.site.trim().toLowerCase() === 'youtube' &&
                      trailer.type.trim().toLowerCase() === 'trailer' &&
                      trailer.key !== ''
                  );
                if (trailer) trailerYoutubeKey = trailer.key;
              }
              resolve({
                id: idMovie,
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                youtube: trailerYoutubeKey,
              });
            });
          });
        });
        Promise.all(promises).then(movies =>
          res.json({ result: true, movies })
        );
      } else {
        res.json({ result: true, movies: [] });
      }
    } else {
      res.json({ result: false, error });
    }
  });
});

// get liked movies
router.get('/mymovies', function (req, res, next) {
  movieModel.find(function (error, data) {
    if (!error) {
      res.json({ result: true, movies: data });
    } else {
      res.json({ result: false, error });
    }
  });
});

// add liked movie
router.post('/mymovies', function (req, res, next) {
  var newMovie = new movieModel({
    id: req.body.id,
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
  });
  newMovie.save(function (error, movie) {
    if (!error) {
      res.json({ result: true, movie });
    } else {
      res.json({ result: false, error });
    }
  });
});

// delete liked movie
router.delete('/mymovies/:id', function (req, res, next) {
  movieModel.deleteOne({ id: req.params.id }, function (error, response) {
    if (!error) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error });
    }
  });
});

module.exports = router;
