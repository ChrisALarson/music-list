const path = require('path');
const spotify = require('./spotify/index');

let myPath = path.resolve(__dirname, 'node_modules');
console.log(myPath);

spotify.searchForSong('the ringer', (error, results) => {console.log(results)});