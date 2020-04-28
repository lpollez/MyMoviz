import React, { useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import { MovieContext } from '../providers/movie.provider';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const Player = ({ url, className }) => {
  const [modal, setModal] = useState(true);
  const { playTrailer } = useContext(MovieContext);

  const toggle = () => {
    if (modal) playTrailer(false, '');
    setModal(!modal);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        centered={true}
      >
        <ModalHeader toggle={toggle}>Trailer</ModalHeader>
        <ModalBody>
          <div
            style={{
              position: 'relative',
              paddingTop: '56.25%',
            }}
          >
            <ReactPlayer
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              url={url}
              width="100%"
              height="100%"
              controls={true}
              playing
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Player;
