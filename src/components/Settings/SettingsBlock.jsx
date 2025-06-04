import React, { Children } from 'react'

const SettingsBlock = ({title, children, additionalClass}) => {
  return (
    <div className={additionalClass? `${additionalClass} settings-block`: 'settings-block'}>
        <h2 className='setting-title'>{title}</h2>
        {children}
    </div>
  )
}

export default SettingsBlock