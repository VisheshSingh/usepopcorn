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

const KEY = '8142efc1';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState('');

  const URL = `https://www.omdbapi.com/?&apikey=${KEY}&s=${query}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(URL);
        const data = await res.json();
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError(null);
    }

    fetchMovies();
  }, [query, KEY]);

  const handleSelectMovie = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
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
          {error && <ErrorMessage />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </div>

        <div className='box'>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
