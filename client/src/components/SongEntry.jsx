import React from 'react';

const SongEntry = ({ songId, addToFavorites, addToPlays }) => {
  return (
    <div data-songid={songId}>
      Song!
      <button data-songid={songId} onClick={addToFavorites}>Add to favorites</button>
      <button data-songid={songId} onClick={addToPlays}>Add to playlist</button>
    </div>
  );
};

export default SongEntry;