

function CommentSkeleton() {
    return (
        <div className="comment-header" style={{ display: "flex" }}>
            <div className="post-header comment-profile-header-container">
                <div style={{ display: "block" }}>
                <div className="post-options-menu" style={{ display: "none" }}>
                    <button className="post-options-menu-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.246 4.042c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v-2.841h-2v24h2v-9.073c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028s-1.621 1.429-3.754 1.429zm1.754 9.544c-.4.207-.959.414-1.593.414-.972 0-1.498-.363-2.371-.964-1.096-.755-2.596-1.79-5.113-1.79-1.979 0-3.71.679-4.923 1.339v-7.488c1.019-.902 2.865-1.949 4.909-1.949 1.333 0 1.894.439 2.741 1.103.966.756 2.288 1.792 4.596 1.792.627 0 1.215-.086 1.754-.223v7.766z" />
                    </svg>
                    <span>Report</span>
                    </button>
                    <button className="post-options-menu-button">
                    <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                        fillRule="nonzero"
                        />
                    </svg>
                    <span>Delete</span>
                    </button>
                </div>
                </div>
                <div
                className="comment-profile-header-second-container"
                >
                <div
                    className="comment-header-poster"
                    style={{ overflow: "hidden", position: "relative" }}
                >
                    <div className="skeleton-picture" />
                </div>
                <div className="post-user-header">
                    <div className="skeleton-line" style={{ width: 100 }} />
                    <div
                    className="skeleton-line"
                    style={{ width: 65, marginTop: "7.5px" }}
                    />
                </div>
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <div
                className="skeleton-line"
                style={{ width: "100%", marginTop: "7.5px" }}
                />
                <div
                className="skeleton-line"
                style={{ width: "95%", marginTop: "7.5px" }}
                />
                <div
                className="skeleton-line"
                style={{ width: "85%", marginTop: "7.5px" }}
                />
            </div>
            </div>


        
    );
  }
  
export default CommentSkeleton;
  