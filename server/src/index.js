const express = require('express');
const spotify = require('../../spotify/index');
const db = require('../../db/src/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.json());

app.get('/user/:name', (req, res) => {
  db.getUserData(req.params.name, (error, userData) => {
    if (error) return console.log('Error in GET /user/:name.. userData', error);
    res.status(200).json(userData);
  });
});

app.post('/users/:userId/favorites/:songId', (req, res) => {
  db.addUserFavorite(req.params.userId, req.params.songId, (error, results) => {
    if (error) return console.log('Error in POST /users/:userId/favorites/:songId', error);
    res.status(201).json(results);
  });
});

app.post('/users/:userId/plays/:songId', (req, res) => {
  db.addUserPlay(req.params.userId, req.params.songId, (error, results) => {
    if (error) return console.log('Error in POST /users/:userId/plays/:songId', error);
    res.status(201).json(results);
  });
});

app.post('/search', (req, res) => {
  spotify.searchForSong(req.body.searchTerm, (error, searchResults) => {
    if (error) return console.log('Error from Spotify in POST /search route: ', error);
    db.addSongs(searchResults, (error, addSongsResults) => {
      if (error) return console.log('Error inserting to DB in POST /search route: ', error);
      res.status(201).json(searchResults);
    });
  });
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));