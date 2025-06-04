

function AccountSkeleton() {
    return (
        <div className="account-block" style={{display: "block"}}>
            <div className="account-header">
                <div className="account-info">
                    <div className="pfp" style={{ position: "relative", overflow: "hidden" }}>
                    <div className="skeleton-picture" />
                    </div>
                    <div className="account-name-container">
                    <div className="accounts-name-header">
                        <div className="skeleton-line" style={{ width: 100 }} />
                    </div>
                    <div className="skeleton-line" style={{ marginTop: 10, width: 50 }} />
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default AccountSkeleton;
  