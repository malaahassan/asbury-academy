import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

const ImageWindow = ({ open, src, close }) => {
    if(open){
        const imageRef = useRef();
        function closeCheck(e){
            if(e.target != imageRef.current){
                close();
            }
            
        }
        return (
            <>
                {ReactDOM.createPortal(
                <div className="window-container" onClick={closeCheck}>
                    <button className="my-post-image-remove-button" style={{display: "flex", opacity: 1}}>
                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"></path></svg>
                    </button>

                    <img ref={imageRef} className="window-image" src={src} />
                </div>,
                document.body)}
            </>
            );
    }
  
};

export default ImageWindow;