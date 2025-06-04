import React, { useContext, useState, useRef } from 'react';
import UseOutsideClick from '../Window/UseOutsideClick';
import SureWindow from '../Window/SureWindow';
import { LoginContext } from '../Contexts/LoginContext';
import { Link } from 'react-router-dom';
import { useXHR } from "../Contexts/UseXHR";
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../Contexts/MenuContext';

function PersonalAccount() {
  const navigate = useNavigate();
  
  const { sendRequest } = useXHR();
  const [logoutConfirmDisplayed, setLogoutConfirmDisplayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const personalAccountMenuRef = useRef();
  const personalAccountButtonRef = useRef();
  const logoutTimeout = useRef();

  const { logData, setLogData } = useContext(LoginContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const { closeMenu } = useContext(MenuContext);


  UseOutsideClick(personalAccountMenuRef, personalAccountButtonRef, () => isVisible && toggleVisibility());

  function logout(event){
    
    const closeButton = event.currentTarget;
    closeButton.style.pointerEvents = "none";
    closeButton.style.opacity = "0.5";

    sendRequest(
      ()=>{
        
      },
      "/back/logout.php",
      {

      },
      logoutTimeout,
      () => {
          setIsLoggedIn(false);
          setLogData({});
          //closeMenu();
          navigate('/login');
      }, 
      () => {
        if(closeButton != null){
          closeButton.style.pointerEvents = "auto";
          closeButton.style.opacity = "1";
        }
        
      }
      
    );
  }

  function toggleVisibility(){
    const personalAccountMenu = personalAccountMenuRef.current;
    const personalAccountButton = personalAccountButtonRef.current;
    let timer;
    if(isVisible){
        personalAccountButton.style.pointerEvents = "none";
      timer = setTimeout(function(){
        clearTimeout(timer);
        personalAccountMenu.style.display = "none";
        personalAccountButton.style.pointerEvents = "auto";
      }, 300);
    } else {
        personalAccountMenu.style.display = "flex";
    }
    setIsVisible(!isVisible);
  }

  function prepareLogout(){
    toggleVisibility();
    setLogoutConfirmDisplayed(true);
  }


  return (
    <>
    <SureWindow display={logoutConfirmDisplayed} message="Are you sure you want to logout?" button="Logout" onYes={logout} onNo={()=>setLogoutConfirmDisplayed(false)}/>
    <button ref={personalAccountButtonRef} className={isVisible ?  "notifications-button-open notifications-button" : "notifications-button"} onClick={() => toggleVisibility()}>
      
      {isVisible ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"/></svg>

      : 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>

      }
      
    </button>
    <div ref={personalAccountMenuRef} className={isVisible ? "notifications-menu fade-in" : "notifications-menu fade-out"} style={{display: "none"}}>
    <div style={{ display: "flex", alignItems: "center" }}>
        <div
            className="post-header"
            style={{ paddingLeft: 15, marginBottom: 0, marginTop: 15 }}
        >
            <img
            className="post-header-poster"
            src={logData.profile}
            alt="User Photo"
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 15 }}>{logData.user_first_name} {logData.user_last_name}</span>
            <span style={{ fontSize: 11, opacity: "75%" }}>@{logData.username}</span>
            </div>
        </div>
        
        
        </div>
        <div className="hr"/>
        <div className="personal-account-menu-container">
            <Link to={`/community/profiles/${logData.username}`} onClick={closeMenu} className="personal-account-menu-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>
                Profile 
            </Link>
            <Link to="/settings" className="personal-account-menu-button" onClick={closeMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                >
                <path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z" />
              </svg>

                Settings
            </Link>
            <button className="personal-account-menu-button" onClick={prepareLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 14.874v-1.814h-3.25c-.745 0-1.128-.26-1.451-.706l-1.709-2.302-2.791 3.024 1.509 2.149c.478.753.514 1.267.514 1.952v5.823h-2.699v-5.474c-.021-1.512-2.455-2.945-3.303-1.723l-1.617 2.281c-.359.51-.971.686-1.565.686h-4.638v-2.621l3.483-.003c.544 0 1.017-.193 1.274-.806l1.549-3.782c.269-.563.632-1.076 1.076-1.515l3.609-3.573-1.02-.891c-.306-.267-.716-.381-1.116-.311l-2.999.525-.471-2.201 4.115-.784c.771-.147 1.433.103 2.009.636l3.961 3.656c.628.57 1.272 1.563 2.276 3.047.184.272.443.656 1.053.656h2.201v-1.85l3 2.96-3 2.961zm-3.101-8.747c1.403-.268 2.323-1.623 2.055-3.026-.269-1.403-1.624-2.323-3.026-2.055-1.403.269-2.323 1.624-2.055 3.026.268 1.404 1.623 2.324 3.026 2.055z"/></svg>

                Logout
            </button>
        </div>
      </div>
    </>
    
    
  );
}

export default PersonalAccount;
