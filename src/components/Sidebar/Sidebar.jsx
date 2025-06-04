import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import { MenuContext } from '../Contexts/MenuContext';

import { useNavigate } from 'react-router-dom';
import Errors from '../Window/Errors';
import SureWindow from '../Window/SureWindow';

import Logo from './Logo.jsx';
import SidebarButton from './SidebarButton.jsx';


function Sidebar({page}) {
  const [error, setError] = useState({error: null, message: null});

  const navigate = useNavigate();
  const { logData, setLogData } = useContext(LoginContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const { isMenuOpen, toggleMenu, closeMenu } = useContext(MenuContext);


  

  function handleGoToProfile(){
    navigate('/profile/posts');
    closeMenu();
  }
  return (
    <div className={isMenuOpen ? "side-container side-container-open" : "side-container"}>
      <Errors error={error} onClose={()=> setError({error: null, message: null})}/>
      <div className="side-container-shape-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.28 2.17" preserveAspectRatio="none">
            <path className="path1" d="M35.28 1.67c-3.07-.55-9.27.41-16.15 0-6.87-.4-13.74-.58-19.13.1v.4h35.28z" fill="%23e7267f"/>
            <path className="path2" d="M35.28 1.16c-3.17-.8-7.3.4-10.04.56-2.76.17-9.25-1.47-12.68-1.3-3.42.16-4.64.84-7.04.86C3.12 1.31 0 .4 0 .4v1.77h35.28z" opacity=".5" fill="%23e7267f"/>
            <path className="path3" d="M35.28.31c-2.57.84-7.68.3-11.8.43-4.1.12-6.85.61-9.57.28C11.18.69 8.3-.16 5.3.02 2.3.22.57.85 0 .87v1.2h35.28z" opacity=".5" fill="%23e7267f"/>
          </svg>
          {/* <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              className="path1"
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            />
            <path
              className="path2"
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            />
            <path
              className="path3"
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            />
          </svg> */}
      </div>

      
      <div className="side-second-container">
        <div className="logo-container">
          <Logo />
        </div>
        
        <div className="side-buttons-container">
      
          <SidebarButton link="/" dropdown_buttons={[]} closeMenu={closeMenu} current_page={page=="dashboard"}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"                    width="180.000000pt" height="180.000000pt" viewBox="0 0 180.000000 180.000000"                    preserveAspectRatio="xMidYMid meet">                                      <g transform="translate(0.000000,180.000000) scale(0.100000,-0.100000)"                    stroke="none">                   <path d="M51 1786 c-46 -26 -50 -47 -51 -264 0 -221 5 -248 55 -270 37 -17                   713 -17 750 0 49 22 55 49 55 267 0 217 -5 243 -51 267 -39 20 -722 20 -758 0z                   m659 -266 l0 -130 -280 0 -280 0 0 130 0 130 280 0 280 0 0 -130z"/>                   <path d="M1051 1786 c-50 -28 -50 -26 -51 -563 0 -539 0 -542 51 -569 41 -21                   657 -21 698 0 51 27 51 30 51 566 0 536 0 539 -51 566 -39 20 -662 20 -698 0z                   m599 -566 l0 -430 -250 0 -250 0 0 430 0 430 250 0 250 0 0 -430z"/>                   <path d="M51 1086 c-50 -28 -50 -28 -51 -533 0 -507 0 -512 51 -539 41 -21                   717 -21 758 0 50 27 51 32 51 536 0 504 -1 509 -51 536 -39 20 -722 20 -758 0z                   m659 -536 l0 -400 -280 0 -280 0 0 400 0 400 280 0 280 0 0 -400z"/>                   <path d="M1034 466 l-34 -34 0 -176 c0 -193 7 -222 55 -244 37 -17 653 -17                   690 0 48 22 55 51 55 237 0 111 -4 179 -12 196 -24 53 -39 55 -394 55 l-326 0                   -34 -34z m616 -216 l0 -100 -250 0 -250 0 0 100 0 100 250 0 250 0 0 -100z"/></g></svg>
            Dashboard
          </SidebarButton>

          


          <SidebarButton current_page={false} dropdown_buttons={[{link: "/tests/act", text:"ACT Tests", current_page: page=="act"}, {link: "/tests/est", text:"EST Tests", current_page: page=="est"}, {link: "/tests/sat", text:"Classic SAT Tests", current_page: page=="sat"}, {link: "/tests/digitalsat", text:"Digital SAT Tests", current_page: page=="digitalsat"}]} closeMenu={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z"/></svg>
            Full Mock Tests
          </SidebarButton>

          <SidebarButton current_page={false} dropdown_buttons={[{link: "/tests/writing-workouts", text:"Writing Skills Workout", current_page: page=="writing-workouts"}, {link: "/tests/reading-workouts", text:"Reading Skills Workout", current_page: page=="reading-workouts"}]} closeMenu={closeMenu}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z"/></svg> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 10.031v-6.423l-6.036-3.608-5.964 3.569v6.499l-6 3.224v7.216l6.136 3.492 5.864-3.393 5.864 3.393 6.136-3.492v-7.177l-6-3.3zm-1.143.036l-4.321 2.384v-4.956l4.321-2.539v5.111zm-4.895-8.71l4.272 2.596-4.268 2.509-4.176-2.554 4.172-2.551zm-10.172 12.274l4.778-2.53 4.237 2.417-4.668 2.667-4.347-2.554zm4.917 3.587l4.722-2.697v5.056l-4.722 2.757v-5.116zm6.512-3.746l4.247-2.39 4.769 2.594-4.367 2.509-4.649-2.713zm9.638 6.323l-4.421 2.539v-5.116l4.421-2.538v5.115z"/></svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 12c0 2.206 1.794 4 4 4 1.761 0 3.242-1.151 3.775-2.734l2.224-1.291.001.025c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.084 0 2.098.292 2.975.794l-2.21 1.283c-.248-.048-.503-.077-.765-.077-2.206 0-4 1.794-4 4zm4-2c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2l-.002-.015 3.36-1.95c.976-.565 2.704-.336 3.711.159l4.931-2.863-3.158-1.569.169-3.632-4.945 2.87c-.07 1.121-.734 2.736-1.705 3.301l-3.383 1.964c-.29-.163-.621-.265-.978-.265zm7.995 1.911l.005.089c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8c1.475 0 2.853.408 4.041 1.107.334-.586.428-1.544.146-2.18-1.275-.589-2.69-.927-4.187-.927-5.523 0-10 4.477-10 10s4.477 10 10 10c5.233 0 9.521-4.021 9.957-9.142-.301-.483-1.066-1.061-1.962-.947z"/></svg>
            Classified Workouts
          </SidebarButton>

          {/* <SidebarButton current_page={page=="videos"} dropdown_buttons={[]} closeMenu={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.169 19.754c.522-.79.831-1.735.831-2.754 0-2.761-2.238-5-5-5s-5 2.239-5 5 2.238 5 5 5c1.019 0 1.964-.309 2.755-.832l2.831 2.832 1.414-1.414-2.831-2.832zm-4.169.246c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm-4.89 2h-7.11l2.599-3h2.696c.345 1.152.976 2.18 1.815 3zm-2.11-5h-10v-17h22v12.11c-.574-.586-1.251-1.068-2-1.425v-8.685h-18v13h8.295c-.19.634-.295 1.305-.295 2zm-4-4h-2v-6h2v6zm3 0h-2v-9h2v9zm3 0h-2v-4h2v4z"/></svg>
            Diagnostic Tests
          </SidebarButton> */}

          <SidebarButton link="/videos"  dropdown_buttons={[]} closeMenu={closeMenu} current_page={page=="videos"} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"/></svg>
            Video Classes
          </SidebarButton>

          {/* <SidebarButton link="/assignments" dropdown_buttons={[]} closeMenu={closeMenu} current_page={page=="assignments"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm6.054-9.053l2-2.024v-.887h-4.609l2.609 2.808v.103zm0 12.134v3.955h-16v-16.192l2.666-2.808h-4.666v21h20v-7.98l-2 2.025zm-14.297-11.045h12.651l-3.312-3.569v-.41c.001-1.668-1.352-3.021-3.021-3.021-1.667 0-3.021 1.332-3.021 3l.001.431-3.298 3.569zm6.297-5c.553 0 1 .448 1 1s-.447 1-1 1-1-.448-1-1 .447-1 1-1zm14 7.125l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201z"/></svg>
            Assignments
          </SidebarButton> */}

          <SidebarButton link="/community" dropdown_buttons={[]} closeMenu={closeMenu} current_page={page=="community"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"/></svg>Community
          </SidebarButton>
          

          {logData.admin && 
              <>
                
                {/*<Link to="/admin/dashboard" className={page == "panel" ? "side-button chosen-side-button" : "side-button"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 18c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-14-3c-1.654 0-3 1.346-3 3s1.346 3 3 3h14c1.654 0 3-1.346 3-3s-1.346-3-3-3h-14zm19 3c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm0-12c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm-15 0c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z"/></svg>Control Panel</Link>*/}
                <SidebarButton current_page={false} dropdown_buttons={[{link: "/admin/accounts", text:"Accounts", current_page: page=="admin-accounts"}, {link: "/admin/groups", text:"Groups", current_page: page=="admin-groups"}, {link: "/admin/tests", text:"Tests & Workouts", current_page: page=="admin-tests"}, {link: "/admin/videos", text:"Video Classes", current_page: page=="admin-videos"}]} closeMenu={closeMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.271 4.473v-2.473h1.459v2.473c-.243-.018-.486-.028-.73-.028s-.487.01-.729.028zm-3.588 1.002l-.948-2.287c.436-.212.886-.398 1.349-.558l.946 2.287c-.21.068-.418.145-.624.228-.247.1-.488.21-.723.33zm7.346-.538l.962-2.28c.462.162.91.352 1.345.567l-.962 2.279c-.254-.13-.514-.25-.779-.358-.187-.076-.375-.145-.566-.208zm5.495 4.744l2.287-.947c.212.436.398.885.559 1.348l-2.288.947c-.068-.21-.145-.418-.228-.625-.1-.247-.21-.487-.33-.723zm-2.303-2.934l1.749-1.748c.364.323.708.667 1.031 1.031l-1.749 1.749c-.158-.184-.323-.362-.496-.535s-.352-.339-.535-.497zm-13.473 1.031l-1.749-1.748c.322-.364.667-.709 1.031-1.031l1.749 1.748c-.183.158-.362.323-.535.496s-.338.352-.496.535zm-1.272 10.537l-2.287.946c-.212-.435-.398-.885-.559-1.348l2.288-.947c.068.21.145.418.228.625.1.247.21.488.33.724zm17.586-1.289l2.28.962c-.162.461-.352.91-.567 1.344l-2.279-.961c.13-.254.25-.514.358-.78.076-.186.145-.375.208-.565zm2.938-2.299h-2.474c.019-.242.027-.485.027-.73 0-.244-.009-.487-.027-.729h2.474v1.459zm-4.748 5.49l1.749 1.749c-.323.364-.667.709-1.032 1.032l-1.748-1.749c.184-.158.362-.324.535-.497s.338-.352.496-.535zm-16.314-9.248l-2.28-.962c.162-.461.352-.91.567-1.344l2.279.961c-.13.254-.25.514-.358.78-.076.186-.145.375-.208.565zm-.464 3.758h-2.474v-1.459h2.474c-.019.242-.027.485-.027.729-.001.245.008.488.027.73zm3.305 6.522l-1.752 1.751-1.031-1.031 1.752-1.752c.158.184.323.362.496.535s.352.338.535.497zm6.221-14.806c-4.165 0-7.554 3.389-7.554 7.554s3.389 7.554 7.554 7.554 7.554-3.389 7.554-7.554-3.389-7.554-7.554-7.554zm-2.275 6.864l-2.158-2.158 1.413-1.415 2.158 2.158-1.413 1.415z"/></svg>
                  Admin Privileges
                </SidebarButton>
                
              </>
          }

          


          {/*<Link to="/quizzes"className={page == "quizzes" ? "side-button chosen-side-button" : "side-button"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 6h-16v1h16v-1zm0-2h-16v1h16v-1zm0 4h-16v1h16v-1zm0 2h-16v1h16v-1zm-7 2h-9v1h9v-1zm-13-12v19h24v-19h-24zm22 16h-20v-14h20v14zm-6.599 5l2.599 3h-12l2.599-3h6.802z"/></svg>Digital Practices</Link>*/}
          
          
          
            
            {/*<div className="side-profile-container">
                  <img src={logData.profile} alt="User Photo" />
                  <h2 id="side-profile-name">{`${logData.user_first_name} ${logData.user_last_name}`}</h2>
                  <p style={{ marginTop: 0, color: '#838383' }}>
                    {logData.role == "teacher" && 
                    "Teacher"
                    }
                    {logData.role == "staff" && 
                    "School Staff"
                    }
                    {logData.role == "student" && 
                    `Student in Class ${logData.class}` 
                    }
                    </p>
                    { (logData.admin || logData.role != "student") &&
                      <button id="view-profile-button" onClick={handleGoToProfile}>View Profile</button>
                    }
                  
                </div>*/}
        
        </div>
      </div>
      
      
      
      
    </div>
  );
}

export default Sidebar;
