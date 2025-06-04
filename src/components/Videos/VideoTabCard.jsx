import { useState, useRef } from "react";
import { Link } from 'react-router-dom';

function VideoTab({id, name, user_name, views, user_poster, time, thumbnail, duration, progress, available, in_history, description}) {
    
    const elementRef = useRef(null);
    const [height, setHeight] = useState(0);
    //VideoHeightCalculator(elementRef, setHeight);
    
    return (
        <Link to={`/videos/watch/${id}`} className={`video-tab ${!available ? "video-tab-locked" : ""} ${in_history ? "video-tab-history" : ""}`} style={{pointerEvents: available ? "auto" : "none"}}>
            <div className="video-tab-img-container" ref={elementRef}>
                <img className="video-tab-img" src={thumbnail} />
                {progress &&
                    <div className="video-tab-progress-bar">
                        <div className="video-tab-progress" style={{width: progress}}>
                        </div>
                    </div>
                }
                <div className="video-tab-play-icon-container">
                    { available ? 
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"></path><path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"></path></g></svg>
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/></svg>

                    }
                </div>
                
                <span className="video-tab-duration-box">{duration}</span>
            </div>
            
            <div className="video-tab-info-container">
                {!in_history && <img className="video-tab-poster" src={user_poster} alt="User Profile Picture" />}
                
                <div className="video-tab-info">
                    <h4 className="video-tab-title" title={name}>{name}</h4>
                    <div className="video-tab-user-credit">
                        {in_history && <img className="video-tab-poster" src={user_poster} alt="User Profile Picture" />}
                        <span>{user_name}</span>
                    </div>
                    <div className="video-tab-user-credit">
                        <span>{views.text} view{views.number != 1 && "s"}</span>
                        <span className="video-tab-user-credit-bullet"></span>
                        <span>{time}</span>
                    </div>
                    { in_history &&
                        <div className="video-tab-description">
                            {description}
                        </div>
                    }
                    
                </div>
            </div>
        </Link>
    );
  }
  
export default VideoTab;