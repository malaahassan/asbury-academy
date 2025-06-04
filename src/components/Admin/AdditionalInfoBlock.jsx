import React from 'react'
import { useState, useRef, useEffect } from 'react'

const AdditionalInfoBlock = ({height, title, subtitle, children, setOpen}) => {
    const superExpandContainerRef = useRef();
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
      const el = superExpandContainerRef.current;
      if (!el) return;
    
      const updateHeight = () => {
        
        setScrollHeight(el.scrollHeight);
      };
    
      // Initial height
      updateHeight();
    
      // Resize observer
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(el);
    
      // Mutation observer
      const mutationObserver = new MutationObserver(updateHeight);
      mutationObserver.observe(el, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    
      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }, []);
    
    const [superExpanded, setSuperExpanded] = useState(false)
    function toggleSuperExpanded(e){
      e.preventDefault();
      setSuperExpanded(prev=>!prev);
      if(setOpen){
        setOpen(prev=>!prev);
      }
      
    }
  return (
    <>
        <button className='super-expander' onClick={toggleSuperExpanded} > <div className="super-expander-text-container"><span>{title}</span><span className="super-expander-sub-title">{subtitle}</span></div> <svg style={superExpanded?{transform:'rotate(-90deg)'}:{}} className={'settings-arrow'} rpl="" fill="currentColor" height="20" icon-name="caret-right-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path></svg></button>
        <div ref={superExpandContainerRef} className={superExpanded? 'subjects-section super-expanded':'subjects-section'} style={{maxHeight: superExpanded ? scrollHeight : 0}}>
            {children}
        </div>
    </>

  )
}

export default AdditionalInfoBlock;