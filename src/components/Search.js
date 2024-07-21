import React, { useEffect, useRef } from 'react';

const Search = ({ query, onChangeQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    function cb(e) {
      if (document.activeElement === inputRef.current) return;

      if (e.code === 'Enter') {
        inputRef.current.focus();
        onChangeQuery('');
      }
    }
    document.addEventListener('keydown', cb);

    return () => {
      document.removeEventListener('keydown', cb);
    };
  }, []);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => onChangeQuery(e.target.value)}
      ref={inputRef}
    />
  );
};

export default Search;
