import { useEffect, useState } from 'react';

const KEY = '8142efc1';

const useMovies = (query) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const URL = `https://www.omdbapi.com/?&apikey=${KEY}&s=${query}`;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(URL, { signal });
        console.log(res);
        if (!res.ok) {
          throw new Error('Something went wrong while fetching movies');
        }

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('No movie with such name');
        }

        setMovies(data.Search);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError(null);
      return;
    }

    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [query, KEY]);

  return { isLoading, error, movies };
};

export default useMovies;
