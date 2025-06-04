import React from 'react'
import SessionSettingsBlock from './SessionSettingsBlock.jsx'

const Sessions = ({sessions, is_profile}) => {
  return (
        <>
        {sessions.map((session, index) => (
          <SessionSettingsBlock key={index} id={session.id} current={session.current} title={session.title} icon={session.icon} is_profile={is_profile}/> 
        ))}
        {sessions.length <= 0 && 
        <h2>No devices.</h2>
        }
        </>
  );
}

export default Sessions;