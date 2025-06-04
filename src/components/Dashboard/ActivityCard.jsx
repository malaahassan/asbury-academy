

function ActivityCard({text, number, children, background, color}) {
  
    return (
            <div className="dashboard-activity-card" style={{background: background}}>
                <div className="dashboard-activity-title">
                    <div className="dashboard-activity-icon" style={{background: color}}>
                        {children}
                        
                    </div>
                    {text}
                </div>
                <div className="dashboard-activity-number-container">
                <h3 className="dashboard-activity-number">
                    {number}
                </h3>
                <span className="dashboard-activity-number-line" style={{background: color}}></span>
                </div>

            </div>
    );
  }
  
export default ActivityCard;