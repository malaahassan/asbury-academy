
function VideoPlaybackSkeleton() {

    

    return (
      <>
        <div style={{ width: "100%", height: "75dvh", minHeight: "80dvh", position: "relative" }}>
          <div className="skeleton-picture" style={{borderRadius: 0}}>

          </div>
        </div>
        <div className="video-playback-details-container">
        <div className="skeleton-line" style={{ width: "80%" }} />
        <a className="post-header-profile-block" href="/community/profiles/">
          <div
            className="post-header-poster"
            style={{
              position: "relative",
              overflow: "hidden",
              minWidth: 40,
              minHeight: 40
            }}
          >
            <div className="skeleton-picture" />
          </div>
          <div className="post-user-header" style={{ width: 140 }}>
            <div className="skeleton-line" style={{ width: "100%" }} />
            <div className="skeleton-line" style={{ width: "45%", marginTop: 10 }} />
          </div>
        </a>
        <div className="video-playback-details-box">
          <div className="video-tab-user-credit video-playback-info-text">
            <div className="skeleton-line" style={{ width: "15%" }} />
          </div>
          <div className="skeleton-line" style={{ marginTop: 20, width: "100%" }} />
          <div className="skeleton-line" style={{ width: "90%", marginTop: 10 }} />
          <div className="skeleton-line" style={{ width: "90%", marginTop: 10 }} />
          <div className="skeleton-line" style={{ width: "70%", marginTop: 10 }} />
        </div>
      </div>
      </>
        
      




        
    );
  }
  
export default VideoPlaybackSkeleton;
  