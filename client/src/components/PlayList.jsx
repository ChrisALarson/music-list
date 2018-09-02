import React from 'react';
import SongEntry from './SongEntry.jsx';

const PlayList = ({ plays, addToFavorites, addToPlays }) => {
  return (
    <div>
      Playlist!
      { plays.map((song, index) => <SongEntry key={index} song={song} addToFavorites={addToFavorites} addToPlays={addToPlays}/>) }
    </div>
  );
};

export default PlayList;