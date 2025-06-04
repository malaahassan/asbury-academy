import React, { useContext } from 'react';
import SearchBar from './SearchBar';

import Notifications from './Notifications';
import PersonalAccount from './PersonalAccount';
import { MenuContext } from '../Contexts/MenuContext';


function Header() {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);

  return (

      <div className="topnav-icons-container">
        
        <Notifications />
        <PersonalAccount />
        <button onClick={toggleMenu} className={isMenuOpen ? "notifications-button notifications-button-open menu-button" : "notifications-button menu-button"}>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeMiterlimit={2}
          strokeLinejoin="round"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            fillRule="nonzero"
            d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
          />
        </svg>

        </button>
        
      </div>
      
  );
}

export default Header;
