import React, { useState, useContext } from 'react';
import { MovieContext } from '../providers/movie.provider';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setViewLikedMovies, totalMovies, totalLikedMovies } = useContext(
    MovieContext
  );

  return (
    <div style={{ marginBottom: '7rem' }}>
      <Navbar color="dark" dark expand="md" fixed="top">
        <span className="navbar-brand">
          <img
            src="./logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo myMoviz"
          />
        </span>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="" navbar>
            <NavItem>
              <NavLink
                onClick={() => setViewLikedMovies(false)}
                href="#"
                style={{
                  fontSize: '1.6rem',
                  color: '#FFFFFF',
                  margin: '0 1rem',
                }}
                className="text-warning"
              >
                {`Top ${totalMovies} Films Populaires`}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => setViewLikedMovies(true)}
                href="#"
                style={{
                  fontSize: '1.6rem',
                  color: '#FFFFFF',
                  margin: '0 1rem',
                }}
                className="text-warning"
              >
                <span>{`Mes Favoris (${totalLikedMovies})`}</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
