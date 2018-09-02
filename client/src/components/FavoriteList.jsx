import React from 'react';
import SongEntry from './SongEntry.jsx';

const FavoriteList = ({ favorites, addToFavorites, addToPlays }) => {
  return (
    <div>
      Favorites!
      { favorites.map((song, index) => <SongEntry  key={index} song={song} addToFavorites={addToFavorites} addToPlays={addToPlays}/>) }
    </div>
  );
};

export default FavoriteList;