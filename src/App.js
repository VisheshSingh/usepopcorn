import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Search from './components/Search';
import Loader from './components/Loader';
import NumMovies from './components/NumMovies';
import MoviesList from './components/MoviesList';
import WatchedSummary from './components/WatchedSummary';
import ErrorMessage from './components/ErrorMessage';
import WatchedMovieList from './components/WatchedMovieList';
import MovieDetails from './components/MovieDetails';
import useMovies from './hooks/useMovies';

export default function App() {
  const [watched, setWatched] = useState(function () {
    const storeValue = localStorage.getItem('watched')
      ? JSON.parse(localStorage.getItem('watched'))
      : [];
    return storeValue;
  });
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState('');

  // custom hook to fetch movies
  const { isLoading, error, movies } = useMovies(query);

  // Store watched to local storage
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  const handleSelectMovie = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  };

  const handleAddMovieToWatched = (newMovie) => {
    setWatched((watched) => [...watched, newMovie]);
  };

  const handleDeleteMovieFromWatched = (id) => {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <nav className='nav-bar'>
        <Logo />
        <Search query={query} onChangeQuery={setQuery} />
        <NumMovies movies={movies} />
      </nav>

      <main className='main'>
        <div className='box'>
          {isLoading && <Loader />}
          {error && <ErrorMessage error={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </div>

        <div className='box'>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddMovie={handleAddMovieToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteMovieFromWatched}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
