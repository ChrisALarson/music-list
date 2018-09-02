import React from 'react';

const Search = ({ onSearch }) => {
  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" placeholder="Songname.."></input>
        <button>Find Em</button>
      </form>
    </div>
  );
};

export default Search;