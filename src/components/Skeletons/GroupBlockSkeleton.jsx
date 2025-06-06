

function GroupBlockSkeleton() {
    return (
        <div
        className="account-block applicant-block"
        style={{ height: 63, display: "flex" }}
        >
        <div className="account-header" style={{ width: "100%" }}>
            <div className="account-info" style={{ width: "100%", maxWidth: "100%" }}>
            <div className="admission-headers-container" style={{ width: "100%" }}>
            <svg className="admission-header-icon"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 32, height: 32 }}
                >
                <path
                    d="m2.394 15.759s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm0-3.113s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm10.271-9.455c-.246-.128-.471-.191-.692-.191-.223 0-.443.065-.675.191l-8.884 5.005c-.276.183-.414.444-.414.698 0 .256.139.505.414.664l8.884 5.006c.221.133.447.203.678.203.223 0 .452-.065.689-.203l8.884-5.006c.295-.166.451-.421.451-.68 0-.25-.145-.503-.451-.682zm-8.404 5.686 7.721-4.349 7.72 4.349-7.72 4.35z"
                    fillRule="nonzero"
                />
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
  
  export default GroupBlockSkeleton;
  