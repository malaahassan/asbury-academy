

function ProfileSkeleton() {
  return (

      <div className="profile-info-container">
                  <div className="profile-cover-photo" style={{ background: "#FFF"}}>
                    <div className="skeleton-picture" />
                    <div
                      className="pfp-overlay-container"
                      style={{ display: "none", zIndex: 0 }}
                    >
                      <div className="pfp-overlay" />
                      <div className="lds-spinner">
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    </div>
                  </div>
                  <div className="profile-user-info">
                    <div
                      className="pfp-wrapper"
                      style={{ width: 170, height: 170, marginTop: "-2rem", marginLeft: 0 }}
                    >
                      <div className="pfp-second-wrapper" style={{ background: "#FFF" }}>
                        <div className="skeleton-picture" />
                      </div>
                    </div>
                    <div className="name-and-bio">
                      <div className="skeleton-line" style={{ width: 150 }} />
                      <div className="skeleton-line" style={{ width: 75, marginTop: 12 }} />
                    </div>
                  </div>
                </div>
  );
}

export default ProfileSkeleton;
