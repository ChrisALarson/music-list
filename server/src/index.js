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
    const userId = userData.userId;
    db.getUserFavorites(userId, (error, userFavorites) => {
      if (error) return console.log('Error in GET /user/:name.. userFavorites', error);
      db.getUserPlays(userId, (error, userPlays) => {
        if (error) return console.log('Error in GET /user/:name.. userPlays', error);
          let body = {
            userId,
            userFavorites,
            userPlays
          };
          res.status(200).json(body);
      });
    });
  });

});

app.post('/search', (req, res) => {
  spotify.searchForSong(req.body.searchTerm, (error, searchResults) => {
    if (error) return console.log('Error from Spotify in POST /search route: ', error);
    db.addSongs(searchResults, (error, addSongsResults) => {
      if (error) return console.log('Error inserting to DB in POST /search route: ', error);
      res.status(201).json(addSongsResults);
    });
  });
});

// post to favorites (?)
// post to playlist (?)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));