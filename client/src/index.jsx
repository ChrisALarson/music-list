import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import FavoriteList from './components/FavoriteList.jsx';
import ResultList from './components/ResultList.jsx';
import PlayList from './components/PlayList.jsx';

console.log('Hello client app..');

const user = process.env.USER || 'Chris';
const results = [
  { id: 1234, title: 'The Ringer', artist: 'Eminem' },
  { id: 2345, title: 'Greatest', artist: 'Eminem' },
  { id: 3456, title: 'Lucky You', artist: 'Eminem' },
  { id: 4567, title: 'Stepping Stones', artist: 'Eminem' }
];
const chris = {
  favorites: [ 1234, 3456 ],
  plays: [ 4567 ]
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
      results: results
    },
    this.addToFavorites = this.addToFavorites.bind(this);
    this.addToPlays = this.addToPlays.bind(this);
  }

  onSearch(event) {

  }

  search(songName) {
    // execute Spotify API helper
    // set state of results
  }

  addToFavorites(event) {
    const newFavorites = this.state.userData.favorites.concat([ parseInt(event.target.dataset.songid) ]);
    const plays = this.state.userData.plays;
    this.setState({
      userData: {
        favorites: newFavorites,
        plays: plays
      }
    });
  }

  addToPlays(event) {
    const newPlays = this.state.userData.plays.concat([ parseInt(event.target.dataset.songid) ]);
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
          <NavBar />
          <FavoriteList favorites={this.state.userData.favorites} addToFavorites={this.addToFavorites}  addToPlays={this.addToPlays}/>
          <ResultList results={this.state.results}/>
          <PlayList plays={this.state.userData.plays} addToFavorites={this.addToFavorites} addToPlays={this.addToPlays}/>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));