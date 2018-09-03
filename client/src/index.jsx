import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import FavoriteList from './components/FavoriteList.jsx';
import ResultList from './components/ResultList.jsx';
import PlayList from './components/PlayList.jsx';

console.log('Hello client app..');

const user = process.env.USER || 'Chris';
const results = [{
  name: 'The Ringer',
  id: '2jt2WxXMCD4zjACthkJQVE',
  artist: 'Eminem',
  album: 'Kamikaze',
  albumImageURL:
    'https://i.scdn.co/image/417cdd139d97eb8af3afe3f66fa14af1da331eec',
  popularity: 78,
  explicit: true,
  url: 'https://open.spotify.com/track/2jt2WxXMCD4zjACthkJQVE'
},
{
  name: 'The Ringer',
  id: '6y8S81PdWonn8j9PmahZMf',
  artist: 'Eminem',
  album: 'Kamikaze',
  albumImageURL:
    'https://i.scdn.co/image/a1bd86aae780e9bdf27ec724689bc2f8f2e0bb6d',
  popularity: 52,
  explicit: false,
  url: 'https://open.spotify.com/track/6y8S81PdWonn8j9PmahZMf'
},
{
  name: 'Ringer',
  id: '5CnbFX4g6oSZRIxxzWQqSh',
  artist: 'The Unlikely Candidates',
  album: 'Bed of Liars',
  albumImageURL:
    'https://i.scdn.co/image/64ddf9ef21b7eb25979ae6480d2944222087b7a4',
  popularity: 49,
  explicit: false,
  url: 'https://open.spotify.com/track/5CnbFX4g6oSZRIxxzWQqSh'
},
{
  name: 'The Ringer',
  id: '1EaIXfcd0ucrZVGGfXraRu',
  artist: 'Colyer',
  album: 'The Ringer',
  albumImageURL:
    'https://i.scdn.co/image/2bdb701fe45008d50a440360163f60b72c4dcdc9',
  popularity: 21,
  explicit: false,
  url: 'https://open.spotify.com/track/1EaIXfcd0ucrZVGGfXraRu'
},
{
  name: 'Ringer',
  id: '19c89IfJjh5JVkUgMDWpJx',
  artist: 'Cheats',
  album: 'Before the Babies',
  albumImageURL:
    'https://i.scdn.co/image/70bc1e8cca0f108d573ac879550f5a5112cb1f7c',
  popularity: 24,
  explicit: false,
  url: 'https://open.spotify.com/track/19c89IfJjh5JVkUgMDWpJx'
},
{
  name: 'The Ringer',
  id: '1NCSpZSPu6KW84oEUAAWvj',
  artist: 'The Larimers',
  album: 'Assume I\'ll Be Fine',
  albumImageURL:
    'https://i.scdn.co/image/3b256c397a3180a6836c600c2755aa7a8353384a',
  popularity: 13,
  explicit: false,
  url: 'https://open.spotify.com/track/1NCSpZSPu6KW84oEUAAWvj'
},
{
  name: 'Looking for Trouble',
  id: '2xD4DFnrn91xLuy4M7Yxt0',
  artist: 'The Whiskey Gentry',
  album: 'Dead Ringer',
  albumImageURL:
    'https://i.scdn.co/image/0465697a80121a6dd3fcbf092ab5f524ef10c554',
  popularity: 21,
  explicit: false,
  url: 'https://open.spotify.com/track/2xD4DFnrn91xLuy4M7Yxt0'
},
{
  name: 'Leaving',
  id: '66AJcv7YvAyx5V8s6eKkn0',
  artist: 'Catch 22',
  album: 'Washed Up and Through the Ringer',
  albumImageURL:
    'https://i.scdn.co/image/e723480e51acad54958b6bdc36d3baef79d037a3',
  popularity: 24,
  explicit: false,
  url: 'https://open.spotify.com/track/66AJcv7YvAyx5V8s6eKkn0'
},
{
  name: 'The Question for the Ringer',
  id: '2sRm8Qe4jR0mjJG1CgS2iM',
  artist: 'Tomasz Kowalczyk',
  album: 'Phantasmagoria',
  albumImageURL:
    'https://i.scdn.co/image/b1e795f95b9d06ba0b2be58da1c7c2cb672a7265',
  popularity: 0,
  explicit: false,
  url: 'https://open.spotify.com/track/2sRm8Qe4jR0mjJG1CgS2iM'
},
{
  name: 'American Pie',
  id: '4wpuHehFEEpWAlkw3vjH0s',
  artist: 'Catch 22',
  album: 'Washed Up and Through the Ringer',
  albumImageURL:
    'https://i.scdn.co/image/e723480e51acad54958b6bdc36d3baef79d037a3',
  popularity: 22,
  explicit: false,
  url: 'https://open.spotify.com/track/4wpuHehFEEpWAlkw3vjH0s'
}];


const chris = {
  favorites: ['6y8S81PdasdfasWonn8j9PmahZMf'],
  plays: ['6y8S81PdWoasdfasdfnn8j9PmahZMf']
};



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: user,
      userData: {
        favorites: chris.favorites,
        plays: chris.plays
      },
      favorites: [],
      plays: [],
      results: []
    };
    this.addToFavorites = this.addToFavorites.bind(this);
    this.addToPlays = this.addToPlays.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(event) {
    event.preventDefault();
    let songName = event.target[0].value; // get input element's value
    this.search(songName);
    event.target.value = '';
  }

  search(songName) {
    fetch('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchTerm: songName })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          results: data
        });
      })
      .catch(error => console.log('Error: ', error));
  }

  addToFavorites(event) {
    console.log(event.target);
    // const newFavorites = this.state.userData.favorites.concat([event.target.dataset.songid]);
    // const plays = this.state.userData.plays;
    // this.setState({
    //   userData: {
    //     favorites: newFavorites,
    //     plays: plays
    //   }
    // });
  }

  addToPlays(event) {
    const newPlays = this.state.userData.plays.concat([event.target.dataset.songid]);
    const favorites = this.state.userData.favorites;
    this.setState({
      userData: {
        favorites: favorites,
        plays: newPlays
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar onSearch={this.onSearch} />
        <FavoriteList favorites={this.state.userData.favorites} addToFavorites={this.addToFavorites} addToPlays={this.addToPlays} />
        <ResultList results={this.state.results} addToFavorites={this.addToFavorites} addToPlays={this.addToPlays} />
        <PlayList plays={this.state.userData.plays} addToFavorites={this.addToFavorites} addToPlays={this.addToPlays} />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));