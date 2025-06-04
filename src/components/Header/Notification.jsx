
function Notification({name, read, text, poster, time, post_id}) {
    return(
        <div className={read? "notification": "notification notification-unread"} onClick={() => window.location.href = `/community/posts/${post_id}`}>
            <div className="unread-dot"></div>
            {/*<button className="post-options-button">
                <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/></svg>
            </button>*/}
            <div className="post-header comment-profile-header-container">
                <img className="notification-header-poster" src={poster} alt="User Profile Picture" />
                <div className="comment-profile-header">
                    <span><strong>{name}</strong> {text}</span>
                    <small>{time}</small>
                </div>
            </div>
        </div>
    );
    
}

export default Notification;

