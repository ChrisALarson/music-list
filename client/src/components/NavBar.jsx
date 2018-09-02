import React from 'react';
import Profile from './Profile.jsx';
import Search from './Search.jsx';

const NavBar = ({ onSearch }) => {
  return (
    <div>
      Navbar!
      <Search onSearch={onSearch}/>
      <Profile />
    </div>
  );
};

export default NavBar;