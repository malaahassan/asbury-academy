import React from 'react'
import { useState, useRef, useEffect } from 'react'

const ExpandableInfoBlock = ({children, expanded}) => {
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
        
  return (

    <div ref={superExpandContainerRef} className={expanded ? 'account-full-info-wrapper expanded-info' : 'account-full-info-wrapper'} style={{maxHeight: expanded ? scrollHeight : 0}}>
        {children}
    </div>

  )
}

export default ExpandableInfoBlock;