import React from 'react';
import ReactDOM from 'react-dom';

const DataParseFailureWindow = ({ retry, close, message }) => {
  function handleRetry() {
    close();
    retry();
  }
  return ReactDOM.createPortal(
    <div className="window-container">
        <div className="window">
          <h2>Data Parse Failure</h2>
          <div>
            <p>We encountered an issue while processing the data. The response from the server couldn't be parsed ({message}).</p>
            <p>You can try one of the following:</p>
            <ul>
            <li><strong>Try Again Later</strong> - The issue might be temporary. Please try again after some time.</li>
            <li><strong>Refresh the Page</strong> - Reload the page to see if the issue resolves itself.</li>
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

export default DataParseFailureWindow;