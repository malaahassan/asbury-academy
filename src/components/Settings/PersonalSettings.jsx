import React, { useState, useContext } from 'react';
import SettingsBlock from './SettingsBlock';
import EditPasswordWindow from '../Window/EditPasswordWindow';
import EditNameWindow from '../Window/EditNameWindow';
import EditEmailWindow from '../Window/EditEmailWindow';
import EditPhoneWindow from '../Window/EditPhoneWindow';
import EditBirthdateWindow from '../Window/EditBirthdateWindow';

import { Link } from 'react-router-dom';
import { LoginContext } from '../Contexts/LoginContext';

const PersonalSettings = () => {
    const [editPasswordWindow , setEditPasswordWindow] = useState(false);
    const [editNameWindow , setEditNameWindow] = useState(false);
    const [editEmailWindow , setEditEmailWindow] = useState(false);
    const [editPhoneWindow , setEditPhoneWindow] = useState(false);
    const [editBirthdateWindow , setEditBirthdateWindow] = useState(false);

    const { logData, setLogData } = useContext(LoginContext);

  return (
    <div className='settings-blocks-container'>
        <h1 className='settings-header'>Personal</h1>
        <div className='settings-wrapper'>

            <SettingsBlock title='Profile' additionalClass='personal-settings'>
                <Link to={`/community/profiles/${logData.username}`} className='settings-info-container'>
                    <h2 className= 'settings-info'>Customize profile</h2>
                    <svg className='settings-arrow' rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg>
                </Link>
            </SettingsBlock >
            <SettingsBlock title='Username'  additionalClass='personal-settings disabled-settings' >
                <div className='settings-info-container'>
                    <h2 className= 'settings-info'>@{logData.username}</h2>
                    <svg className='settings-arrow' rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg>
                </div>
            </SettingsBlock >
            <SettingsBlock title='Full name'  additionalClass='personal-settings' >
                {editNameWindow && 
                    <EditNameWindow  update={(response)=> setLogData((prev)=>({...prev, user_first_name: response.first_name, user_last_name: response.last_name}))} first_name={logData.user_first_name} last_name={logData.user_last_name} onClose={()=>{setEditNameWindow(false) }}/>
                }

                <div className='settings-info-container' onClick={()=>{setEditNameWindow(true)}}>
                    <h2 className= 'settings-info'>{logData.user_first_name} {logData.user_last_name}</h2>
                    <svg className='settings-arrow' rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg>
                </div>
            </SettingsBlock >
            <SettingsBlock title='Birthdate'  additionalClass='personal-settings' >
                {editBirthdateWindow && 
                    <EditBirthdateWindow  update={(response)=> setLogData((prev)=>({...prev, birthdate: response.birthdate}))} birthdate={logData.birthdate.date} onClose={()=>{setEditBirthdateWindow(false) }}/>
                }
                <div className='settings-info-container' onClick={()=>{setEditBirthdateWindow(true)}}>
                    <h2 className= 'settings-info'>{logData.birthdate.text}</h2>
                    <svg className='settings-arrow' rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg>
                </div>
            </SettingsBlock >
            
            
            
            <SettingsBlock title='Phone number' additionalClass='personal-settings' >
                {editPhoneWindow && 
                    <EditPhoneWindow  update={(response)=> setLogData((prev)=>({...prev, phone: response.phone}))} phone={logData.phone} onClose={()=>{setEditPhoneWindow(false) }}/>
                }
                <div className='settings-info-container' onClick={()=>{setEditPhoneWindow(true)}}>
                    <h2 className= 'settings-info'>{logData.phone ? logData.phone : "Add phone"}</h2>
                    <svg className='settings-arrow' rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg>
                </div>
            </SettingsBlock >
            <SettingsBlock title='Email address' additionalClass='personal-settings' >
                {editEmailWindow && 
                    <EditEmailWindow  update={(response)=> setLogData((prev)=>({...prev, email: response.email}))} email={logData.email} onClose={()=>{setEditEmailWindow(false) }}/>
                }
                <div className='settings-info-container' onClick={()=>{setEditEmailWindow(true)}}>
                    <h2 className= 'settings-info'>{logData.email ? logData.email : "Add email"}</h2>
                    <svg className='settings-arrow' rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg>
                </div>
            </SettingsBlock >
            

            <SettingsBlock title='Password' additionalClass='personal-settings' >
                <EditPasswordWindow state={editPasswordWindow} onClose={()=>{setEditPasswordWindow(false) }}/>
                <div className='settings-info-container' onClick={()=>{setEditPasswordWindow(true)}}>
                    <h2 className= 'settings-info'>Change password</h2>
                    <svg className='settings-arrow' rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg>
                </div>
            </SettingsBlock >
        </div>
    </div>
  )
}

export default PersonalSettings;