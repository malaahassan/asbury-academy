import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Link } from 'react-router-dom';
import React, {useContext} from 'react'
import PersonalSettings from '../components/Settings/PersonalSettings'
import NotificationSettings from '../components/Settings/NotificationSettings'
import SessionSettings from '../components/Settings/SessionSettings'
import { LoginContext } from '../components/Contexts/LoginContext';
function Settings() {
    const { logData, setLogData } = useContext(LoginContext);
    return (
      <div className="inner-content">
        <div className="inner-content-with-header-no-sidebar">
            <Header />
            <div className='profile-universal-container'>
                <div className="page-go-back-container settings-go-back-container">
                  <Link to={-1} className="page-go-back">
                              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"></path></svg>
                  </Link>
                  <h3 className="page-go-back-header">Settings</h3>
                </div>  
                <PersonalSettings />
                <NotificationSettings settings={logData.settings.notifications} logData={logData}/>
                <SessionSettings sessions={logData.sessions}/>
            </div>
        </div>
      </div>
    );
  }
export default Settings;