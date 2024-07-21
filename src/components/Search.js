import React from 'react';

const Search = ({ query, onChangeQuery }) => {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => onChangeQuery(e.target.value)}
    />
  );
};

export default Search;
