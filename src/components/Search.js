import React, { useRef } from 'react';
import useKey from '../hooks/useKey';

const Search = ({ query, onChangeQuery }) => {
  const inputRef = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    onChangeQuery('');
  });

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
