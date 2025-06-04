import React, {useRef} from 'react';
import ReactDOM from 'react-dom';

const PostInfoWindow = ({ onClose, firstName, lastName, postedAt, post_id }) => {
  const postedBy = `${firstName} ${lastName}`.trim();
  const windowRef = useRef();

  function closeCheck(e){
    if(e.target != windowRef.current && !windowRef.current.contains(e.target)){
        onClose();
    }  
}

  return ReactDOM.createPortal(
    <div className="window-container" onClick={closeCheck}>
      <div className="window post-info-window" ref={windowRef}>
        <button className="window-remove-button my-post-image-remove-button" onClick={()=>{onClose()}} style={{ display: 'flex' }}>
             <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"></path></svg>
        </button>
        <h1 className='window-header'>Post Info</h1>
        <div className='post-info-wrapper'>
        <div className='post-info-block'>  
            <div className="post-info-container disabled-settings" style={{ opacity: '1' }}>
              <h2 className="settings-info">Post id</h2>
              <svg className="settings-arrow" fill="currentColor" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.942 15.442l-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"/>
              </svg>
            </div>   
            <h2 className="setting-title">{post_id}</h2>
          </div>

          <div className='post-info-block'>  
            <div className="post-info-container disabled-settings" style={{ opacity: '1' }}>
              <h2 className="settings-info">Posted by</h2>
              <svg className="settings-arrow" fill="currentColor" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.942 15.442l-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"/>
              </svg>
            </div>   
            <h2 className="setting-title">{postedBy}</h2>
          </div>

          <div className='post-info-block'>  
            <div className="post-info-container disabled-settings" style={{ opacity: '1' }}>
              <h2 className="settings-info">Posted at</h2>
              <svg className="settings-arrow" fill="currentColor" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.942 15.442l-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"/>
              </svg>
            </div>   
            <h2 className="setting-title">{postedAt}</h2>
          </div>

          

          
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PostInfoWindow;