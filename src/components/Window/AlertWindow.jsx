import React from 'react';
import ReactDOM from 'react-dom';

const AlertWindow = ({alert, onClose }) => {
  return ReactDOM.createPortal(
    <div className="window-container">
        <div className="window" style={{height: "max-content"}}>
          <h2>Alert</h2>
          <div>
            <ul>
              {alert.map((a, i)=> <li key={i}>{a}</li>)}
            </ul>
          </div>
          <div className="window-buttons">
              <button className="post-button" onClick={onClose}>Okay</button>
          </div>
        </div>
      
    </div>,
    document.body
  );
};

export default AlertWindow;