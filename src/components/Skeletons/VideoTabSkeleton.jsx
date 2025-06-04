
function VideoTabSkeleton() {



    return (
        <div className="video-tab  " style={{ pointerEvents: "none" }}>
            <div className="video-tab-img-container">
                <div className="skeleton-picture" />
            </div>
            <div className="video-tab-info-container">
                <div
                className="video-tab-poster"
                style={{ position: "relative", overflow: "hidden" }}
                >
                <div className="skeleton-picture" />
                </div>
                <div className="video-tab-info">
                <div className="skeleton-line" style={{ width: "95%" }} />
                <div className="skeleton-line" style={{ marginTop: 10, width: "60%" }} />
                </div>
            </div>
        </div>




        
    );
  }
  
export default VideoTabSkeleton;
  