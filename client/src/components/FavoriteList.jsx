import React from 'react';
import SongEntry from './SongEntry.jsx';

const FavoriteList = ({ favorites, addToFavorites, addToPlays }) => {
  return (
    <div>
      Favorites!
      { favorites.map((favorite, index) => <SongEntry key={index} songId={favorite} addToFavorites={addToFavorites} addToPlays={addToPlays}/>) }
    </div>
  );
};

export default FavoriteList;