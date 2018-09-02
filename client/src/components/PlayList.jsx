import React from 'react';
import SongEntry from './SongEntry.jsx';

const PlayList = ({ plays, addToFavorites, addToPlays }) => {
  return (
    <div>
      Playlist!
      { plays.map((play, index) => <SongEntry key={index} songId={play} addToFavorites={addToFavorites} addToPlays={addToPlays}/>) }
    </div>
  );
};

export default PlayList;