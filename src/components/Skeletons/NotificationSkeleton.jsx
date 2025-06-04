

function NotificationSkeleton() {
    return (
        <div className="notification">
            <div className="unread-dot" />
            <div className="post-header comment-profile-header-container">
                <div
                className="notification-header-poster"
                style={{ overflow: "hidden", position: "relative" }}
                >
                <div className="skeleton-picture" />
                </div>
                <div className="comment-profile-header" style={{ width: "80%" }}>
                <div className="skeleton-line" style={{ width: "100%" }} />
                <div
                    className="skeleton-line"
                    style={{ width: "75%", marginTop: "7.5px" }}
                />
                </div>
            </div>
        </div>



        
    );
  }
  
export default NotificationSkeleton;
  