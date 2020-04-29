import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext({
  movies: [],
  likedMovies: [],
  totalMovies: 0,
  totalLikedMovies: 0,
  isViewLikedMovies: false,
  isLoading: false,
  isPlayingTrailer: false,
  urlTrailer: '',
  initMovies: () => {},
  initLikedMovies: () => {},
  addLikedMovie: () => {},
  removeLikedMovie: () => {},
  setViewLikedMovies: () => {},
  setIsLoadingData: () => {},
  playTrailer: () => {},
});

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [likedMovies, setLikedMovies] = useState([]);
  const [totalLikedMovies, setTotalLikedMovies] = useState(0);
  const [isViewLikedMovies, setIsViewLikedMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [urlTrailer, setUrlTrailer] = useState('');

  useEffect(() => {
    if (movies) {
      setTotalMovies(movies.length);
      setTotalLikedMovies(movies.filter(movie => movie.isLiked).length);
    }
  }, [movies]);

  useEffect(() => {
    if (movies) {
      setMovies(
        movies.map(movie =>
          likedMovies
            .reduce((acc, val) => [...acc, val.id], [])
            .includes(movie.id)
            ? { ...movie, isLiked: true }
            : { ...movie, isLiked: false }
        )
      );
    }
  }, [likedMovies]);

  const initMovies = sourceMovies => {
    setMovies(sourceMovies);
  };

  const initLikedMovies = sourceLikedMovies =>
    setLikedMovies(sourceLikedMovies);

  const addLikedMovie = movieToAdd => {
    const existingMovie = likedMovies.find(movie => movie.id === movieToAdd.id);
    if (!existingMovie) {
      setLikedMovies([...likedMovies, movieToAdd]);
    }
  };

  const removeLikedMovie = movieToRemove =>
    setLikedMovies(likedMovies.filter(movie => movie.id !== movieToRemove.id));

  const setViewLikedMovies = isLikedView => setIsViewLikedMovies(isLikedView);

  const setIsLoadingData = isLoadingData => setIsLoading(isLoadingData);

  const playTrailer = (isPlay, url) => {
    setIsPlayingTrailer(isPlay);
    setUrlTrailer(url);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        likedMovies,
        totalMovies,
        totalLikedMovies,
        isViewLikedMovies,
        isLoading,
        isPlayingTrailer,
        urlTrailer,
        initMovies,
        initLikedMovies,
        addLikedMovie,
        removeLikedMovie,
        setViewLikedMovies,
        setIsLoadingData,
        playTrailer,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
