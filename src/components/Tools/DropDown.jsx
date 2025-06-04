import React, { useState, useEffect, useRef } from 'react';
import UseOutsideClick from '../Window/UseOutsideClick';

const DropDown = ({ options, value, onChange, sections, menuId, loading }) => {
  const [isActive, setIsActive] = useState(false);
  
  const dropdownRef = useRef(null);
  const filterMenuRef = useRef(null);

  UseOutsideClick(filterMenuRef, dropdownRef, ()=>setIsActive(false));
  /*useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);*/

  const handleOptionClick = (option) => {
    onChange(option.value);
    //setIsActive(false);
  };

  function handleClick(option){
    //if(option.value == value){
      setIsActive(false);
    //}
  }

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className='filter-block'>
    <div className='filter-button' onClick={() => setIsActive(!isActive)} ref={dropdownRef} style={{pointerEvents: loading && "none"}}>
      {loading ? 
        <div className="comment-send-loader" style={{display: "block"}} /> :
        <span className='filter-display-name'>{selectedOption?.displayName || 'Select an option'}</span>
      }
      
      <svg style={{transform: isActive ? "rotate(180deg)" : "none"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"></path></svg>
    </div>
    <div ref={filterMenuRef} className='filter-menu' style={isActive ? {} : { display: 'none' }}>
        {options.map((option, index) => (
          <React.Fragment key={option.value}>
            {sections && sections.some(section => section.title === option.section) && (
              <>
                {index === 0 || options[index - 1].section !== option.section ? <div className='dropdown-section-title'>{option.section}</div> : ''}
              </>
            )}
            <div className='option-container'>
              <input
                id={option.value + option.displayName + menuId}
                type="radio"
                name="option"
                value={option.value}
                checked={selectedOption?.value === option.value}
                onChange={() => handleOptionClick(option)}
                onClick={() => handleClick(option)}
              />
              <label htmlFor={option.value + option.displayName + menuId}>{option.displayName}</label>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
    
  );
};

export default DropDown;