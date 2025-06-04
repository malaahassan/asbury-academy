import React, { useState } from 'react';

const Text = ({ text, expanded, charLimit = 500 }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  if (!text) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const shouldTruncate = text.length > charLimit;
  const displayedText = isExpanded || !shouldTruncate ? text : text.slice(0, charLimit) + '...';

  return (
    <p >
      <span>
        {displayedText.split('\n').map((line, index, array) => (
          <span key={index}>
            {line.split(urlRegex).map((part, i) =>
              urlRegex.test(part) ? (
                <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="post-link">
                  {part}
                </a>
              ) : (
                part
              )
            )}
            {index !== array.length - 1 && <br />}
          </span>
        ))}
      </span>
      {shouldTruncate && (
        <button className="load-more-comments" onClick={() => setIsExpanded(!isExpanded)} style={{display: 'inline' }}>
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
      </p>
  );
};

export default Text;
