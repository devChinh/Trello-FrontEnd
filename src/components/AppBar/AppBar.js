import React from "react";
import "./AppBar.scss";
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import NotificationsIcon from '@mui/icons-material/Notifications';

function AppBar() {
  return (
    <nav className="navbar-app">
      
      <div className="navbar-left">
      <AppsIcon className="icons" />
      <HomeIcon className="icons" />
      <span className="search-input">
        <input type="text" className="input" />
        <SearchIcon className="icons-input" />
      </span>
      </div>

      <div className="navbar-center">
        <img src="https://play-lh.googleusercontent.com/CiGs15N1e1tXrSnVLEY9jOnKi1oNzPQNRjqhR8fXE0pnu_bRyNmfc8xXr2VQUJTfJ9A" alt="trello" />
        <h3>Trello</h3>
      </div>

      <div className="navbar-right">
        <AddIcon className="icons" />
        <ReportGmailerrorredIcon   className="icons"/>
        <NotificationsIcon   className="icons"/>
        <img src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-dog-cartoon-dog-various-breeds-of-dogs-year-of-the-dog-png-image_335490.jpg" alt="dog" />
      </div>
    </nav>
  );
}

export default AppBar;
