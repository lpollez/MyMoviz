import React, { useContext } from 'react';
import WithSpinner from './WithSpinner';
import { MovieContext } from '../providers/movie.provider';
import Movie from './Movie';

const Movies = ({ movies }) => {
  const { isViewLikedMovies } = useContext(MovieContext);

  return isViewLikedMovies
    ? movies
        .filter(movie => movie.isLiked)
        .map(movie => <Movie key={movie.id} movie={movie} />)
    : movies.map(movie => <Movie key={movie.id} movie={movie} />);
};

export default WithSpinner(Movies);
