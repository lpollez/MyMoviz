import React, { useEffect, useContext } from 'react';
import Navbar from './Navbar';
import Movies from './Movies';
import Player from './MoviePlayer';
import { MovieContext } from '../providers/movie.provider';
import { Row, Container } from 'reactstrap';

const MainScreen = () => {
  const {
    movies,
    totalLikedMovies,
    isPlayingTrailer,
    urlTrailer,
    initMovies,
    initLikedMovies,
    setIsLoadingData,
    isLoading,
    isViewLikedMovies,
  } = useContext(MovieContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        let response = await fetch(
          'https://my-moviz-backend.herokuapp.com/movies'
        );
        let data = await response.json();
        initMovies(data.movies);
        response = await fetch(
          'https://my-moviz-backend.herokuapp.com/mymovies'
        );
        data = await response.json();
        initLikedMovies(data.movies);
      } catch (error) {
        console.log(error);
      }
      setIsLoadingData(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{ marginBottom: '2rem', width: '100vw' }}
        className="row justify-content-center"
      >
        <img
          style={{ width: '200px' }}
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
          alt="TBDB logo"
        />
      </div>
      <Container style={{ marginBottom: '2.5rem' }}>
        <Row>
          {isViewLikedMovies && totalLikedMovies === 0 ? (
            <div
              style={{ height: '70vh', width: '100vw' }}
              className="row align-items-center justify-content-center"
            >
              <p style={{ fontSize: '2.5rem', color: 'white' }}>
                Aucun film à afficher
              </p>
            </div>
          ) : (
            <Movies movies={movies} isLoading={isLoading} />
          )}
          {isPlayingTrailer && urlTrailer ? <Player url={urlTrailer} /> : null}
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
