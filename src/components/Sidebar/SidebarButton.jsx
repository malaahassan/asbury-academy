import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';



function SidebarButton({dropdown_buttons, link, children, closeMenu, current_page}) {
    const [menuDown, setMenuDown] = useState(dropdown_buttons.some(obj => obj.current_page == true));

    function dropDownMenuClick(){
        //closeMenu();
        setMenuDown(!menuDown);
    }

  return (
    <>
    {dropdown_buttons.length > 0 ?
    <div className={`side-button ${dropdown_buttons.some(obj => obj.current_page == true) ? "chosen-side-button" : ""} ${menuDown ? "open-side-button" : ""}`}>
        <div onClick={dropDownMenuClick} className="side-button-inner-container">
            {children}
            <span className="dropdown-icon">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                >
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                </svg>

            </span>
        </div>
        <div className="side-button-inner-menu" style={{height: menuDown ? `${dropdown_buttons.length*45}px` : 0}}>
            {dropdown_buttons.map((button, index) =>
                <Link  key={index} onClick={closeMenu} className={`side-button-inner-button ${button.current_page ? "chosen-side-button-inner-button" : ""}`} to={button.link}>{button.text}</Link>
            )}
        </div>
        
    </div>
    :
    <Link onClick={closeMenu} to={link} className={`side-button ${current_page ? "chosen-side-button" : ""} ${menuDown ? "open-side-button" : ""}`}>
        <div className="side-button-inner-container">
            {children}
        </div>
    </Link>

    }
    </>
    
  );
}

export default SidebarButton;
