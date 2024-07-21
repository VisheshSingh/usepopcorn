import React from 'react';
import MoviesList from './MoviesList';

const WatchedMovieList = ({ watched }) => {
  return <MoviesList movies={watched} />;
};

export default WatchedMovieList;
