

function PostSkeleton() {
    return (
        <div className="post" style={{ display: "block" }}>
            <div className="post-header">
                <div
                className="post-header-profile-block"
                >
                <div
                    className="post-header-poster"
                    style={{ position: "relative", overflow: "hidden" }}
                >
                    <div className="skeleton-picture" />
                </div>
                <div className="post-user-header">
                    <div className="skeleton-line" style={{ width: 100 }} />
                    <div className="skeleton-line" style={{ width: 65, marginTop: 10 }} />
                </div>
                </div>
            </div>
            <div className="post-pins-container" />
            <div style={{ height: 135 }}>
                <div className="skeleton-line" style={{ marginTop: 10, width: "75%" }} />
                <div className="skeleton-line" style={{ marginTop: 10, width: "100%" }} />
                <div className="skeleton-line" style={{ marginTop: 10, width: "100%" }} />
                <div className="skeleton-line" style={{ marginTop: 10, width: "100%" }} />
                <div className="skeleton-line" style={{ marginTop: 10, width: "40%" }} />
            </div>
        </div>

        
    );
  }
  
  export default PostSkeleton;
  