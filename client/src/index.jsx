import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.jsx';
import FavoriteList from './components/FavoriteList.jsx';
import ResultList from './components/ResultList.jsx';
import PlayList from './components/PlayList.jsx';

console.log('Hello client app..');

const user = process.env.USER || 'Chris';
const results = [
  { title: 'The Ringer', artist: 'Eminem' },
  { title: 'Greatest', artist: 'Eminem' },
  { title: 'Lucky You', artist: 'Eminem' },
  { title: 'Stepping Stones', artist: 'Eminem' }
];
const chris = {
  favorites: [ 
    { title: 'The Ringer', artist: 'Eminem' },
    { title: 'Lucky You', artist: 'Eminem' }
  ],
  playList: [
    { title: 'Stepping Stones', artist: 'Eminem' }
  ]
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'user',
      userData: {
        favorites: chris.favorites,
        playList: chris.playList
      },
      results: results
    }
  }

  render() {
    return (
      <div>
          <NavBar />
          <FavoriteList />
          <ResultList />
          <PlayList />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));