

function TestBlockSkeleton() {
    return (
        <div
        className="account-block applicant-block"
        style={{ height: 63, display: "flex" }}
        >
        <div className="account-header" style={{ width: "100%" }}>
            <div className="account-info" style={{ width: "100%", maxWidth: "100%" }}>
            <div className="admission-headers-container" style={{ width: "100%" }}>
                <svg className="admission-header-icon"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                style={{ width: 24, height: 24, minWidth: 24, minHeight: 24 }}
                >
                <path d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z" />
                </svg>
                <div
                style={{ display: "flex", flexDirection: "column", width: "100%" }}
                >
                <div className="skeleton-line" style={{ width: "35%" }} />
                <div
                    className="skeleton-line"
                    style={{ width: "20%", marginTop: 10 }}
                />
                </div>
            </div>
            </div>
        </div>
        </div>

    );
  }
  
  export default TestBlockSkeleton;
  