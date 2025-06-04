
function VideoHistoryTabSkeleton() {


    return (
        <div
            className="video-tab  video-tab-history"
            style={{ pointerEvents: "none" }}
            >
            <div className="video-tab-img-container">
                <div className="skeleton-picture" />
                <div className="video-tab-progress-bar">
                <div className="video-tab-progress" style={{ width: "0.4%" }} />
                </div>
            </div>
            <div className="video-tab-info-container">
                <div className="video-tab-info">
                <div className="skeleton-line" style={{ width: "80%" }} />
                <div className="video-tab-user-credit">
                    <div
                    className="video-tab-poster"
                    style={{ position: "relative", overflow: "hidden" }}
                    >
                    <div className="skeleton-picture" />
                    </div>
                    <div className="skeleton-line" style={{ width: "26%" }} />
                </div>
                <div className="video-tab-user-credit">
                    <div className="skeleton-line" style={{ width: "20%" }} />
                </div>
                <div className="video-tab-description">
                    <div
                    className="skeleton-line"
                    style={{ marginTop: 10, width: "100%" }}
                    />
                    <div
                    className="skeleton-line"
                    style={{ marginTop: 10, width: "85%" }}
                    />
                    <div
                    className="skeleton-line"
                    style={{ marginTop: 10, width: "40%" }}
                    />
                </div>
                </div>
            </div>
        </div>




        
    );
  }
  
export default VideoHistoryTabSkeleton;
  