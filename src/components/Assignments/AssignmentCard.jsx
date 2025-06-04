

function AssignmentCard({type, name, time}) {
  
    return (
        <div className="assignment-card">
                <div className="assignment-card-top-content">

                    { type == "test" && 
                        <div title="Test" className="dashboard-table-task-icon assignment-card-task-icon" style={{background: "rgb(222, 114, 88)"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z"></path></svg>
                        </div> 
                    }
                    {type == "video" && 
                        <div title="Video" className="dashboard-table-task-icon assignment-card-task-icon" style={{background: "rgb(59, 180, 127)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"></path></svg>
                        </div>
                    }
                    {type == "file" && 
                        <div title="File" className="dashboard-table-task-icon assignment-card-task-icon" style={{background: "#673AB7"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm-3 3h-7v1h7v-1z"></path></svg>
                        </div>
                    }

                <div>
                <h3 className="assignment-card-header">
                    {name}
                </h3>
                <div className="dashboard-table-task-due">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    >
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
                    </svg>
                    Due {time}
                </div>
                </div>
            </div>
            <div className="assignment-card-bottom-buttons">
                <button className="assignment-card-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                >
                    <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
                </svg>
                Start Task
                </button>
            </div>
            </div>

    );
  }
  
  export default AssignmentCard;