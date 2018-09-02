import React from 'react';
import ReactDOM from 'react-dom';

console.log('Hello client app..');

let App = () => {
  return (
    <div>
        Hello React
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));