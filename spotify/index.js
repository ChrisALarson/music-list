const config = require('../config.js');
const request = require('request');

// search 
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
    console.log(body);
    let tracks = JSON.parse(body).tracks.items;
    tracks.forEach(track => {
      searchResults.push({
        name: track.name,
        id: track.id,
        arist: track.artists[0].name,
        albumName: track.album.name,
        albumImageURL: track.album.images[2].url,
        popularity: track.popularity
      });
    });
    callbackToServer(null, searchResults);
  }
  request(options, callback);
};

module.exports = { searchForSong };

// add to playlist (?)