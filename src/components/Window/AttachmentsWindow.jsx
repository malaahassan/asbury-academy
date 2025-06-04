import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import Attachment from '../FeedContent/Attachment';

const AttachmentsWindow = ({display, files, close}) => {
    if(display){
        const windowRef = useRef();
        function closeCheck(e){
            if(e.target != windowRef.current && !windowRef.current.contains(e.target)){
                close();
            }  
        }

        function calcHeight(){
            let height = 100 + files.length*120;
            if(height < 250) {
                height = 250
            }
            if(height > window.innerHeight - 100) {
                height = window.innerHeight - 100;
            }
            return height;
        }

        
        return ReactDOM.createPortal(
            <div className="window-container" onClick={closeCheck}>
                <div className="window" style={{paddingTop: "45px", height: `${calcHeight()}px`}} ref={windowRef}>
                    <button className="my-post-image-remove-button window-remove-button" style={{display: "flex"}} onClick={close}>
                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"></path></svg>
                    </button>
                  <h2>Attachments</h2>
                  <div style={{width: "100%"}}>
                    <div className="homework-attachments">
                        {
                            files.map((file) =>
                                <Attachment key={`${file.info.name}+${file.info.size}`} file={file.info}/>
                            )
                        }
                    </div>
                  </div>
                  
                  
                </div>
              
            </div>,
            document.body
          );
    }
  
};

export default AttachmentsWindow;