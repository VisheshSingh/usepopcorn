import React from 'react';
import MovieItem from './MovieItem';
import Box from './Box';

const MoviesList = ({ movies, onSelectMovie }) => {
  return (
    <Box>
      <ul className='list list-movies'>
        {movies?.map((movie) => (
          <MovieItem
            key={movie.imdbID}
            movie={movie}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </Box>
  );
};

export default MoviesList;
