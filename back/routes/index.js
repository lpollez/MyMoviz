require('dotenv').config();

const express = require('express');
const request = require('request');
const Joi = require('joi');
const movieModel = require('../models/movies');

const router = express.Router();

// get movies from themoviedb with first Youtube trailer FR found
router.get('/movies', (req, res) => {
  let urlApiMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&video=false&page=1`;
  request(urlApiMovies, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      if (body.results) {
        const promises = body.results.map(movie => {
          return new Promise(resolve => {
            const idMovie = movie.id;
            let trailerYoutubeKey = '';
            urlApiMovies = `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`;
            request(urlApiMovies, (error, response, body) => {
              if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                const trailer =
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
      res.status(response.statusCode).json({ result: false, error });
    }
  });
});

// get liked movies
router.get('/mymovies', (req, res) => {
  movieModel.find((error, data) => {
    error
      ? res.status(400).json({ result: false, error })
      : res.json({ result: true, movies: data });
  });
});

// add liked movie
router.post('/mymovies', (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  var newMovie = new movieModel({
    id: req.body.id,
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
  });

  newMovie.save((error, movie) => {
    error
      ? res.status(400).json({ result: false, error })
      : res.json({ result: true, movie });
  });
});

// delete liked movie
router.delete('/mymovies/:id', (req, res) => {
  movieModel.deleteOne({ id: req.params.id }, (error, response) => {
    error
      ? res.status(400).json({ result: false, error })
      : response.deletedCount === 0
      ? res.status(404).json({ result: false })
      : res.json({ result: true });
  });
});

const validateMovie = movie => {
  const schema = {
    id: Joi.number().integer().min(1).required(),
    title: Joi.string().min(1).required(),
    overview: Joi.string().min(0).allow('').allow(null).required(),
    poster_path: Joi.string().min(1).required(),
  };
  return Joi.validate(movie, schema);
};

module.exports = router;
