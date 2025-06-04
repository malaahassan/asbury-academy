import { useEffect } from 'react';

function UseOutsideClick (menuRef, buttonRef, callback)  {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target != menuRef.current && event.target != buttonRef && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, buttonRef, callback]);
};

export default UseOutsideClick;