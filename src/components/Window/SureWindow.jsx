import React from 'react';
import ReactDOM from 'react-dom';

const SureWindow = ({ display, message, button, onYes, onNo}) => {
    if(display){
        return ReactDOM.createPortal(
            <div className="window-container">
                <div className="window" style={{height: "200px"}}>
                  <div>
                    <p style={{textAlign: "center"}}>{message}</p>
                  </div>
                  <div className="window-buttons">
                      <button className="post-button pink-button" onClick={onYes}>{button}</button>
                      <button className="post-button" onClick={onNo}>Close</button>
                  </div>
                </div>
              
            </div>,
            document.body
          );
    }
  
};

export default SureWindow;