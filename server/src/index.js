const express = require('express');
const spotify = require('../../spotify/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.json());

app.post('/search', (req, res) => {
  spotify.searchForSong(req.body.searchTerm, (error, results) => {
    if (error) return console.log('Error from Spotify in POST /search route: ', error);
    res.status(201).json(results);
  });
});

// post to favorites (?)
// post to playlist (?)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));