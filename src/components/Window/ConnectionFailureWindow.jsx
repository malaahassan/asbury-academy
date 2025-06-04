import React from 'react';
import ReactDOM from 'react-dom';

const ConnectionFailureWindow = ({ retry, close, message }) => {
  function handleRetry() {
    close();
    retry();
  }
  return ReactDOM.createPortal(
    <div className="window-container">
        <div className="window">
          <h2>Connection Failure</h2>
          <div>
            <p>The last request couldn't be completed because the connection to the server was lost ({message}).</p>
            <p>You can try one of the following:</p>
            <ul>
                    <li><strong>Check Your Internet</strong> - Ensure your device is connected to the internet.</li>
                    <li><strong>Refresh the Page</strong> - Try refreshing the page.</li>
                    <li><strong>Clear Cache</strong> - Clear your browser’s cache.</li>
                    <li><strong>Disable Extensions</strong> - Turn off browser extensions.</li>
                    <li><strong>Check Firewall/Antivirus</strong> - Ensure they aren't blocking the connection.</li>
                    <li><strong>Try Another Browser</strong> - Use a different browser.</li>
                    <li><strong>Contact Us</strong> - Reach out for further assistance if the problem presists.</li>
            </ul>
          </div>
          <div className="window-buttons">
            {retry && <button className="post-button pink-button" onClick={handleRetry}>Retry</button>}
            <button className="post-button" onClick={close}>Close</button>
          </div>
        </div>
      
    </div>,
    document.body
  );
};

export default ConnectionFailureWindow;