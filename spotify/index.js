const config = require('../config.js');
const request = require('request');

const searchForSong = (songName, callbackToServer) => {
  const uri = `https://api.spotify.com/v1/search?q=${songName}&type=track&market=US&limit=10&offset=0`;
  const encodedUri = encodeURI(uri);
  const headers = {
    'Authorization': config.TOKEN,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  const options = {
    url: encodedUri,
    method: 'GET',
    headers: headers
  };
  const callback = (error, response, body) => {
    if (error) return callbackToServer(error, null);
    let searchResults = [];
    let tracks = JSON.parse(body).tracks.items;
    tracks.forEach(track => {
      searchResults.push({
        name: track.name,
        id: track.id,
        artist: track.artists[0].name,
        album: track.album.name,
        albumImageURL: track.album.images[2].url,
        popularity: track.popularity,
        explicit: track.explicit,
        url: track.external_urls.spotify
      });
    });
    callbackToServer(null, searchResults);
  }
  request(options, callback);
};

module.exports = { searchForSong };