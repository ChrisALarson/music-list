const config = require('../../config');
const mysql = require('mysql');

const DB_URL = process.env.DB_CONNECTION_STRING || config.DB_CONNECTION_STRING;

const db = mysql.createConnection(DB_URL);

// const results = [{
//   name: 'The Ringer',
//   id: '2jt2WxXMCD4zjACthkJQVE',
//   artist: 'Eminem',
//   album: 'Kamikaze',
//   albumImageURL:
//     'https://i.scdn.co/image/417cdd139d97eb8af3afe3f66fa14af1da331eec',
//   popularity: 78,
//   explicit: true,
//   url: 'https://open.spotify.com/track/2jt2WxXMCD4zjACthkJQVE'
// },
// {
//   name: 'The Ringer',
//   id: '6y8S81PdWonn8j9PmahZMf',
//   artist: 'Eminem',
//   album: 'Kamikaze',
//   albumImageURL:
//     'https://i.scdn.co/image/a1bd86aae780e9bdf27ec724689bc2f8f2e0bb6d',
//   popularity: 52,
//   explicit: false,
//   url: 'https://open.spotify.com/track/6y8S81PdWonn8j9PmahZMf'
// },
// {
//   name: 'Ringer',
//   id: '5CnbFX4g6oSZRIxxzWQqSh',
//   artist: 'The Unlikely Candidates',
//   album: 'Bed of Liars',
//   albumImageURL:
//     'https://i.scdn.co/image/64ddf9ef21b7eb25979ae6480d2944222087b7a4',
//   popularity: 49,
//   explicit: false,
//   url: 'https://open.spotify.com/track/5CnbFX4g6oSZRIxxzWQqSh'
// },
// {
//   name: 'The Ringer',
//   id: '1EaIXfcd0ucrZVGGfXraRu',
//   artist: 'Colyer',
//   album: 'The Ringer',
//   albumImageURL:
//     'https://i.scdn.co/image/2bdb701fe45008d50a440360163f60b72c4dcdc9',
//   popularity: 21,
//   explicit: false,
//   url: 'https://open.spotify.com/track/1EaIXfcd0ucrZVGGfXraRu'
// },
// {
//   name: 'Ringer',
//   id: '19c89IfJjh5JVkUgMDWpJx',
//   artist: 'Cheats',
//   album: 'Before the Babies',
//   albumImageURL:
//     'https://i.scdn.co/image/70bc1e8cca0f108d573ac879550f5a5112cb1f7c',
//   popularity: 24,
//   explicit: false,
//   url: 'https://open.spotify.com/track/19c89IfJjh5JVkUgMDWpJx'
// },
// {
//   name: 'The Ringer',
//   id: '1NCSpZSPu6KW84oEUAAWvj',
//   artist: 'The Larimers',
//   album: 'Assume I\'ll Be Fine',
//   albumImageURL:
//     'https://i.scdn.co/image/3b256c397a3180a6836c600c2755aa7a8353384a',
//   popularity: 13,
//   explicit: false,
//   url: 'https://open.spotify.com/track/1NCSpZSPu6KW84oEUAAWvj'
// },
// {
//   name: 'Looking for Trouble',
//   id: '2xD4DFnrn91xLuy4M7Yxt0',
//   artist: 'The Whiskey Gentry',
//   album: 'Dead Ringer',
//   albumImageURL:
//     'https://i.scdn.co/image/0465697a80121a6dd3fcbf092ab5f524ef10c554',
//   popularity: 21,
//   explicit: false,
//   url: 'https://open.spotify.com/track/2xD4DFnrn91xLuy4M7Yxt0'
// },
// {
//   name: 'Leaving',
//   id: '66AJcv7YvAyx5V8s6eKkn0',
//   artist: 'Catch 22',
//   album: 'Washed Up and Through the Ringer',
//   albumImageURL:
//     'https://i.scdn.co/image/e723480e51acad54958b6bdc36d3baef79d037a3',
//   popularity: 24,
//   explicit: false,
//   url: 'https://open.spotify.com/track/66AJcv7YvAyx5V8s6eKkn0'
// },
// {
//   name: 'The Question for the Ringer',
//   id: '2sRm8Qe4jR0mjJG1CgS2iM',
//   artist: 'Tomasz Kowalczyk',
//   album: 'Phantasmagoria',
//   albumImageURL:
//     'https://i.scdn.co/image/b1e795f95b9d06ba0b2be58da1c7c2cb672a7265',
//   popularity: 0,
//   explicit: false,
//   url: 'https://open.spotify.com/track/2sRm8Qe4jR0mjJG1CgS2iM'
// },
// {
//   name: 'American Pie',
//   id: '4wpuHehFEEpWAlkw3vjH0s',
//   artist: 'Catch 22',
//   album: 'Washed Up and Through the Ringer',
//   albumImageURL:
//     'https://i.scdn.co/image/e723480e51acad54958b6bdc36d3baef79d037a3',
//   popularity: 22,
//   explicit: false,
//   url: 'https://open.spotify.com/track/4wpuHehFEEpWAlkw3vjH0s'
// },
// {
//   name: 'American Pie',
//   id: 'asdfasdfasdfasd',
//   artist: 'Catch 22',
//   album: 'Washed Up and Through the Ringer',
//   albumImageURL:
//     'https://i.scdn.co/image/e723480e51acad54958b6bdc36d3baef79d037a3',
//   popularity: 22,
//   explicit: false,
//   url: 'https://open.spotify.com/track/4wpuHehFEEpWAlkw3vjH0s'
// }];

const getUserData = (username, callback) => {
  const query = `SELECT * FROM USERS WHERE NAME=? LIMIT 1`;
  db.query(query, [username], (error, results, fields) => {
    if (error) return callback(error, null);
    callback(null, { userId: results[0].ID });
  });
};

const getUserPlays = (userId, callback) => {
  const query = `SELECT * FROM USERS_PLAYS WHERE USER_ID=?`;
  db.query(query, [userId], (error, results, fields) => {
    if (error) return callback(error, null);
    const plays = [];
    results.forEach(song => {
      plays.push(song.SONG_ID);
    });
    callback(null, plays);
  });
};

const getUserFavorites = (userId, callback) => {
  const query = `SELECT * FROM USERS_FAVORITES WHERE USER_ID=?`;
  db.query(query, [userId], (error, results, fields) => {
    if (error) return callback(error, null);
    const favorites = [];
    results.forEach(song => {
      favorites.push(song.SONG_ID);
    });
    callback(null, favorites);
  });
};

const addSongs = (songs, callback) => {
  const songsValues = [];
  songs.forEach(song => {
    const songValues = [song.id, song.name, song.artist, song.album, song.albumImageURL, song.popularity, song.explicit, song.url];
    songsValues.push(songValues);
  });

  const query = `INSERT IGNORE INTO SONGS(ID, NAME, ARTIST, ALBUM, ALBUM_IMAGE_URL, POPULARITY, EXPLICIT, URL) VALUES ?`;
  db.query(query, [songsValues], (error, results, fields) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};

const addUserFavorite = (userId, songId, callback) => {
  const query = `INSERT IGNORE INTO USERS_FAVORITES(USER_ID, SONG_ID) VALUES (?)`;
  db.query(query, [[userId, songId]], (error, results, fields) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};

const addUserPlay = (userId, songId, callback) => {
  const query = `INSERT INTO USERS_PLAYS(USER_ID, SONG_ID) VALUES (?)`;
  db.query(query, [[userId, songId]], (error, results, fields) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};

// getUserPlays(1, (error, results) => {
//   console.log('plays for user 1..\n', results);
// });

// getUserData('Chris', (error, results) => {
//   console.log(results);
// });

// getUserFavorites(1, (error, results) => {
//   console.log('favorites...\n', results);
// });
// addSongs(results, (error, results) => {
//   console.log('errror..', error);
//   console.log('results..', results);
// });

// addUserFavorite(1, '2sRm8Qe4jR0mjJG1CgS2iM', (error, results) => {
//   console.log('errror..', error);
//   console.log('results..', results);  
// });

// addUserPlay(1, '2sRm8Qe4jR0mjJG1CgS2iM', (error, results) => {
//   console.log('errror..', error);
//   console.log('results..', results);  
// });


module.exports = { getUserData, getUserFavorites, getUserPlays, addSongs, addUserFavorite, addUserPlay };

