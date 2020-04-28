import React from 'react';

import MainScreen from './components/MainScreen';

import MovieProvider from './providers/movie.provider';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => (
  <MovieProvider>
    <div className="App">
      <MainScreen />
    </div>
  </MovieProvider>
);

export default App;
