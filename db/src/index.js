const config = require('../../config');
const mysql = require('mysql');

const DB_URL = process.env.DB_CONNECTION_STRING || config.DB_CONNECTION_STRING;

const db = mysql.createConnection(DB_URL);


const getUserData = (username, callback) => {
  const query = `SELECT * FROM USERS WHERE NAME=? LIMIT 1`;
  db.query(query, [username], (error, results, fields) => {
    if (error) return callback(error, null);
    const userId = results[0].ID;
    getUserFavorites(userId, (error, userFavorites) => {
      if (error) return callback(error, null);
      getUserPlays(userId, (error, userPlays) => {
        if (error) return callback(error, null);
        const userData = {
          userId,
          userFavorites,
          userPlays,
        };
        getSongs(userData.userFavorites, (error, favorites) => {
          if (error) return callback(error, null);
          getSongs(userData.userPlays, (error, plays) => {
            if (error) return callback(error, null);
            callback(null, {
              favorites,
              plays,
              userData
            });
          });
        });
      });
    });
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

const getSongs = (songIds, callback) => {
  const query = `SELECT * FROM SONGS WHERE ID IN ?`;
  db.query(query, [[songIds]], (error, results, fields) => {
    if (error) return callback(error, null);
    const songs = [];
    results.forEach(song => {
      songs.push({
        id: song.ID,
        name: song.NAME,
        artist: song.ARTIST,
        album: song.ALBUM,
        albumImageURL: song.ALBUM_IMAGE_URL,
        popularity: song.POPULARITY,
        explicit: song.EXPLICIT,
        url: song.URL
      });
    });
    callback(null, songs);
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

// getSongs(['0OosghwiloKlyvGgWhal6U', '6hLY3Tz1Xt5kBuKNDTs4ib'], (error, songs) => {
//   console.log(error);
//   console.log(songs);
// });
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


module.exports = { getUserData, getUserFavorites, getUserPlays, getSongs, addSongs, addUserFavorite, addUserPlay };

