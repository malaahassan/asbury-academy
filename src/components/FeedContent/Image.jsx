import React, { useState } from 'react';
import ImageWindow from '../Window/ImageWindow';

function Image({image}) {
    
  const [expandImage, setExpandImage] = useState(false);  
  return (
    <>
        <ImageWindow open={expandImage} src={image} close={() => setExpandImage(false)}/>
        <div className="my-post-image-container" onClick={()=>setExpandImage(true)} style={{display: image ? "flex" : "none"}}>
            <img className="my-post-image" src={image} />
            <div className="my-post-image-overlay" 
            style={{backgroundImage: `url(${image})`}}>
            </div>
        </div>
    </>
  );
}

export default Image;
