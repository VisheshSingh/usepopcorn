import React, { useEffect, useState } from 'react';
import { StarRating } from './StarRating';
import Loader from './Loader';

const KEY = '8142efc1';
const MovieDetails = ({
  watched,
  selectedMovieId,
  onCloseMovie,
  onAddMovie,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
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

  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

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

  useEffect(() => {
    document.title = title ? title : 'usePopcorn 🍿';
  }, [title]);

  const handleAddMovie = () => {
    const newMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating,
      userRating: Number(userRating),
      runtime: Number(runtime.split(' ')[0]),
    };
    onAddMovie(newMovie);
    onCloseMovie();
  };

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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAddMovie}>
                      + Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie at {watchedUserRating} <span>⭐️</span>{' '}
                </p>
              )}
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
