import React from 'react'
import Sessions from './Sessions.jsx'

const SessionSettings = ({sessions}) => {
  return (
    <div className='settings-blocks-container'>
      <h1 className='settings-header'>Devices</h1>
      <div className='settings-wrapper'>
        <Sessions sessions={sessions} is_profile={true}/>
      </div>
    </div>
  );
}

export default SessionSettings;