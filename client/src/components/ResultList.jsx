import React from 'react';
import SongEntry from './SongEntry.jsx';

const ResultList = ({ results, addToFavorites, addToPlays }) => {
  return (
    <div>
      { results.map((song, index) => <SongEntry key={index} song={song} addToFavorites={addToFavorites} addToPlays={addToPlays} />) }
    </div>
  );
};

export default ResultList;