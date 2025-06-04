import React from 'react'
import { useState } from 'react'

const AuthorizationBlock = ({title, id, checked, onChange}) => {
    
  return (
    <div className="settings-block">
        <h2 className="setting-title">{title}</h2>
        <div className="settings-info-container">
            <label className="switch" htmlFor={`${title}-${id}-authorization`}>
            {" "}
            <input
                type="checkbox"
                id={`${title}-${id}-authorization`}
                defaultChecked={checked}
                onChange={onChange}
            />{" "}
            <span className="slider round" />
            </label>
        </div>
    </div>

  )
}

export default AuthorizationBlock;