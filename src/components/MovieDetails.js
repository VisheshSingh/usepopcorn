import React from 'react';

const MovieDetails = ({ selectedMovieId, onCloseMovie }) => {
  return (
    <div className='details'>
      <button className='btn-back' onClick={onCloseMovie}>
        &larr;
      </button>
      MovieDetails - {selectedMovieId}
    </div>
  );
};

export default MovieDetails;
