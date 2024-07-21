import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Search from './components/Search';
import Loader from './components/Loader';
import NumMovies from './components/NumMovies';
import MoviesList from './components/MoviesList';
import WatchedSummary from './components/WatchedSummary';
import ErrorMessage from './components/ErrorMessage';
import WatchedMovieList from './components/WatchedMovieList';

const KEY = '8142efc1';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');

  const URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`;

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
          {!isLoading && !error && <MoviesList movies={movies} />}
        </div>

        <div className='box'>
          <WatchedSummary watched={watched} />
          <WatchedMovieList />
        </div>
      </main>
    </>
  );
}
