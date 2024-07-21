import React, { useEffect, useState } from 'react';
import { StarRating } from './StarRating';
import Loader from './Loader';

const KEY = '8142efc1';
const MovieDetails = ({ selectedMovieId, onCloseMovie }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const URL = `https://www.omdbapi.com/?&apikey=${KEY}&i=${selectedMovieId}`;

  const {
    Title: title,
    Year: year,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    imdbRating,
  } = movie;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(URL);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [selectedMovieId]);
  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
