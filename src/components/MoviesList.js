import React, { useState } from 'react';
import MovieItem from './MovieItem';

const MoviesList = ({ movies, onSelectMovie }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && (
        <ul className='list list-movies'>
          {movies?.map((movie) => (
            <MovieItem
              key={movie.imdbID}
              movie={movie}
              onSelectMovie={onSelectMovie}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesList;
