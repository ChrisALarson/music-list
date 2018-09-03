import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import FavoriteList from './components/FavoriteList.jsx';
import ResultList from './components/ResultList.jsx';
import PlayList from './components/PlayList.jsx';

console.log('Hello client app..');

const user = process.env.USER || 'Chris';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: user,
      userData: {
        userId: 0,
        userFavorites: [],
        userPlays: []
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
        console.log('data in search is..', data);
        this.setState({
          results: data
        });
      })
      .catch(error => console.log('Error: ', error));
  }

  addToFavorites(event) {
    const songId = event.target.dataset.songid;
    const userId = this.state.userData.userId;
    fetch(`users/${userId}/favorites/${songId}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      this.initUserData();
    })
    .catch(error => console.log('Error adding to favorites'));
  }

  addToPlays(event) {
    const songId = event.target.dataset.songid;
    const userId = this.state.userData.userId;
    fetch(`users/${userId}/plays/${songId}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      this.initUserData();
    })
    .catch(error => console.log('Error adding to plays'));
  }

  initUserData() {
    fetch(`/user/${this.state.userName}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        favorites: data.favorites,
        plays: data.plays,
        userData: data.userData
      });
    })
    .catch(error => console.log('Error: ', error));
  }

  componentDidMount() {
    this.initUserData();
  }

  render() {
    return (
      <div>
        <NavBar id="nav" onSearch={this.onSearch} />
        <div id="container">
          <FavoriteList id="favorites" favorites={this.state.favorites} addToFavorites={this.addToFavorites} addToPlays={this.addToPlays} />
          <ResultList id="results" results={this.state.results} addToFavorites={this.addToFavorites} addToPlays={this.addToPlays} />
          <PlayList id="plays" plays={this.state.plays} addToFavorites={this.addToFavorites} addToPlays={this.addToPlays} />
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));