import React, { useContext } from 'react';
import { MovieContext } from '../providers/movie.provider';
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo } from '@fortawesome/free-solid-svg-icons';

const Movie = ({ movie }) => {
  const { addLikedMovie, removeLikedMovie, playTrailer } = useContext(
    MovieContext
  );
  const { id, title, overview, poster_path, youtube, isLiked } = movie;

  const handleLikeClick = async () => {
    if (!isLiked) {
      try {
        addLikedMovie(movie);
        const response = await fetch(
          'https://my-moviz-backend.herokuapp.com/mymovies',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `title=${title}&overview=${overview}&poster_path=${poster_path}&id=${id}`,
          }
        );
        const data = await response.json();
        if (!data.result) {
          console.log(`liked movie ${movie.id} not add in database !`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        removeLikedMovie(movie);
        const response = await fetch(
          `https://my-moviz-backend.herokuapp.com/mymovies/${id}`,
          {
            method: 'DELETE',
          }
        );
        const data = await response.json();
        if (!data.result) {
          console.log(`liked movie ${movie.id} not delete in database !`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePlayTrailer = () => {
    if (youtube) {
      playTrailer(true, `https://www.youtube.com/watch?v=${youtube}`);
    }
  };

  return (
    <Col xs="12" sm="6" md="4" lg="3">
      <div style={{ marginBottom: 30 }}>
        <Card>
          <CardImg
            top
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt="Card image cap"
          />
          {youtube ? (
            <FontAwesomeIcon
              onClick={handlePlayTrailer}
              size="2x"
              style={{
                position: 'absolute',
                top: '2%',
                left: '70%',
                cursor: 'pointer',
                color: '#FFAE3C',
              }}
              icon={faVideo}
            />
          ) : null}
          <FontAwesomeIcon
            onClick={handleLikeClick}
            size="2x"
            style={{
              position: 'absolute',
              top: '2%',
              left: '85%',
              cursor: 'pointer',
              color: isLiked ? '#FC6861' : '#F7F7F7',
            }}
            icon={faHeart}
          />
          <CardBody style={{ height: '240px', overflow: 'auto' }}>
            <CardTitle style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {title}
            </CardTitle>
            <CardText
              style={{
                padding: '0 0.5rem',
                fontSize: '1.4rem',
                textAlign: 'justify',
                textJustify: 'distribute',
                textAlignLast: 'left',
              }}
            >
              {overview ? overview : 'N/A'}
            </CardText>
          </CardBody>
        </Card>
      </div>
    </Col>
  );
};

export default Movie;
