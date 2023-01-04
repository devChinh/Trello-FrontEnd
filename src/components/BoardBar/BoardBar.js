import React from 'react'
import './BoardBar.scss'
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function BoardBar() {
  return (
    <nav className="navbar-board">
      <div className="navbar-board-left">

        <span className="boards">
           <AlignVerticalTopIcon className="icons" />
           <p>Boards</p>
           <ExpandMoreIcon className="icons" />
        </span>

        <h2>Project Management</h2>

        <span className="private">
          <p>Private Workspaces</p>
        </span>

        <img src="https://png.pngtree.com/png-clipart/20190122/ourlarge/pngtree-cartoon-puppy-animal-cartoon-animals-png-image_527011.jpg" alt="dogs" />
        <img src="https://png.pngtree.com/png-clipart/20190122/ourlarge/pngtree-cartoon-puppy-animal-cartoon-animals-png-image_527011.jpg" alt="dogs" />
        <img src="https://png.pngtree.com/png-clipart/20190122/ourlarge/pngtree-cartoon-puppy-animal-cartoon-animals-png-image_527011.jpg" alt="dogs" />
        <img src="https://png.pngtree.com/png-clipart/20190122/ourlarge/pngtree-cartoon-puppy-animal-cartoon-animals-png-image_527011.jpg" alt="dogs" />
        <img src="https://png.pngtree.com/png-clipart/20190122/ourlarge/pngtree-cartoon-puppy-animal-cartoon-animals-png-image_527011.jpg" alt="dogs" />

        <span className="number">
          <p>+6</p>
        </span>

        <p className="text">
          Invite
        </p>

      </div>
      <div className="navbar-board-right">
        <MoreHorizIcon />
        <p>Show menu</p>
      </div>
    </nav>
  )
}

export default BoardBar