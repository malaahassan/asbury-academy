
function VideoBlockSkeleton() {

    

    return (
        <div className="account-block applicant-block">
            <div className="account-header">
                <div className="account-info">
                <div
                    className="admission-headers-container"
                    style={{ alignItems: "flex-start" }}
                >
                    <div className="video-tab-img-container">
                    <div className="skeleton-picture" />
                    <div className="video-tab-play-icon-container">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" />
                        </g>
                        </svg>
                    </div>
                    </div>
                    <div
                    className="admission-name-container"
                    style={{ width: "100%", minWidth: "100%", boxSizing: "border-box" }}
                    >
                    <div
                        className="skeleton-line"
                        style={{ marginTop: 5, width: "60%" }}
                    />
                    <div
                        className="skeleton-line"
                        style={{ marginTop: 15, width: "100%" }}
                    />
                    <div
                        className="skeleton-line"
                        style={{ marginTop: 10, width: "100%" }}
                    />
                    <div
                        className="skeleton-line"
                        style={{ marginTop: 15, width: "40%" }}
                    />
                    </div>
                </div>
                </div>
            </div>
  
        </div>





        
    );
  }
  
export default VideoBlockSkeleton;
  