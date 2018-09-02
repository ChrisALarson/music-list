import React from 'react';

const SongEntry = ({ song, addToFavorites, addToPlays }) => {
  return (
    <div data-songid={song.id}>
      <p>Name: {song.name}</p>
      <p>Artist: {song.artist}</p>
      <p>Explicit: {song.explicit.toString()}</p>
      <button data-songid={song.id} onClick={addToFavorites}>Add to favorites</button>
      <button data-songid={song.id} onClick={addToPlays}>Add to playlist</button>
    </div>
  );
};

export default SongEntry;