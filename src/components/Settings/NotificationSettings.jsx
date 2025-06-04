import React, {useRef, useState} from 'react'
import SettingsBlock from './SettingsBlock'
import { useXHR } from "../Contexts/UseXHR";

const NotificationSettings = ({settings, logData}) => {
  const { sendRequest } = useXHR();

  const [sendLoading, setSendLoading] = useState(false);
  const settingsRef = useRef(settings);
  const notificationSettingsTimeout = useRef();

  function saveNotificationSettings(){
    sendRequest(
      ()=>{
        setSendLoading(true);
      },
      "/back/save_notification_settings.php",
      {
        settings: JSON.stringify(settingsRef.current)
      },
      notificationSettingsTimeout,
      (response) => {
        setSendLoading(false);
      }
      
    );
    
  }

  
  function handleLikesNotifications(e){
    settingsRef.current.community.likes = e.target.checked;
    saveNotificationSettings();
  }
  function handleCommentsNotifications(e){
    settingsRef.current.community.comments = e.target.checked;
    saveNotificationSettings();
  }

  
 
  return (
    <div className='settings-blocks-container'>
      <h1 className='settings-header'>Notifications</h1>

      
      <div className='settings-wrapper settings-wrapper-with-sub-wrappers' style={{pointerEvents: sendLoading ? "none" : "auto"}}>
        
        {/* <div className="settings-sub-wrapper">
          <h3 className="settings-sub-header">Assignments</h3>
          <SettingsBlock title={'When you have a new assignment.'}>
            <div className='settings-info-container'>
                <label className="switch" htmlFor='comments-notifications-input'> <input type="checkbox" defaultChecked={settings.comments} id='comments-notifications-input' onChange={handleCommentsNotifications} /> <span className="slider round"></span></label>
            </div>
          </SettingsBlock>
          <SettingsBlock title={'When your submitted assignment has been graded.'}>
            <div className='settings-info-container'>
                <label className="switch" htmlFor='comments-notifications-input'> <input type="checkbox" defaultChecked={settings.comments} id='comments-notifications-input' onChange={handleCommentsNotifications} /> <span className="slider round"></span></label>
            </div>
          </SettingsBlock>
        </div> */}
        
        <div className="settings-sub-wrapper">
          <h3 className="settings-sub-header">Community</h3>
        
          <SettingsBlock title={'When someone likes your post.'}>
            <div className='settings-info-container'>
                <label className="switch" htmlFor='likes-notifications-input'> <input type="checkbox" defaultChecked={settings.community.likes} id='likes-notifications-input' onChange={handleLikesNotifications}/> <span className="slider round"></span></label>
            </div>
          </SettingsBlock>

          <SettingsBlock title={'When someone comments on your post.'}>
            <div className='settings-info-container'>
                <label className="switch" htmlFor='comments-notifications-input'> <input type="checkbox" defaultChecked={settings.community.comments} id='comments-notifications-input' onChange={handleCommentsNotifications} /> <span className="slider round"></span></label>
            </div>
          </SettingsBlock>
        </div>

      </div>
    </div>
  )
}
export default NotificationSettings