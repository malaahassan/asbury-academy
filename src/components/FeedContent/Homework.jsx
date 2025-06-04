import React, { useState } from 'react';
import AttachmentsWindow from '../Window/AttachmentsWindow';
import HomeworkTurnInWindow from '../Window/HomeworkTurnInWindow';
import HomeworkSubmissionsWindow from '../Window/HomeworkSubmissionsWindow';
const Homework = ({homework, logData, self_post, post_id}) => {
    if(homework){
        const [ turnedIn, setTurnedIn ] = useState(homework.turned_in);
        function handleHomeworkTurnIn(){
            if(!homework.pastdue){
                setIsHomeworkTurnInDisplayed(true);
            }
        }
        const [isAttachmentWindowDisplayed, setIsAttachmentWindowDisplayed] = useState(false);
        const [isHomeworkTurnInDisplayed, setIsHomeworkTurnInDisplayed] = useState(false);
        const [isSubmissionsWindowDisplayed, setIsSubmissionsWindowDisplayed] = useState(false);

        return (
            <>  
               {isSubmissionsWindowDisplayed && <HomeworkSubmissionsWindow onClose={()=>{setIsSubmissionsWindowDisplayed(false)}} post_id={post_id}/> }
                <HomeworkTurnInWindow post_id={post_id} display={isHomeworkTurnInDisplayed} close={()=>setIsHomeworkTurnInDisplayed(false)} onSuccess={()=>setTurnedIn(true)}/>
                <AttachmentsWindow display={isAttachmentWindowDisplayed} files={homework.attachments} close={()=>setIsAttachmentWindowDisplayed(false)}/>
                
                <div className="my-post-event-container">    
                <div className="my-post-event-details">
                    <h4 className="my-post-event-text">HOMEWORK</h4>
                    <h4 className="my-post-event-title">{homework.title}</h4>
                    <div className="my-post-event-info-double-container">
                    <div className="my-post-event-info-container">
                        <div className="my-post-event-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>            
                        <span>Due at {homework.time}</span>
                        </div>

                        <div className="my-post-event-info">
                        <svg style={{transform: "scale(0.87)"}}xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/></svg>            
                        <span>Due on {homework.date}</span>
                        </div>
                        
                        <div className="my-post-event-info my-post-event-underline" style={{maxWidth: "130px", pointerEvents: homework.attachments.length <= 0 && "none"}} onClick={()=>setIsAttachmentWindowDisplayed(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.586 10.461l-10.05 10.075c-1.95 1.949-5.122 1.949-7.071 0s-1.95-5.122 0-7.072l10.628-10.585c1.17-1.17 3.073-1.17 4.243 0 1.169 1.17 1.17 3.072 0 4.242l-8.507 8.464c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7.093-7.05-1.415-1.414-7.093 7.049c-1.172 1.172-1.171 3.073 0 4.244s3.071 1.171 4.242 0l8.507-8.464c.977-.977 1.464-2.256 1.464-3.536 0-2.769-2.246-4.999-5-4.999-1.28 0-2.559.488-3.536 1.465l-10.627 10.583c-1.366 1.368-2.05 3.159-2.05 4.951 0 3.863 3.13 7 7 7 1.792 0 3.583-.684 4.95-2.05l10.05-10.075-1.414-1.414z"></path></svg>
                            <span>{homework.attachments.length} Attachment{ (homework.attachments.length > 1 || homework.attachments.length == 0)  && "s"}</span>
                        </div>

                        {
                            self_post &&
                            <div className="my-post-event-info my-post-event-underline" style={{maxWidth: "130px", pointerEvents: homework.submissions <= 0 && "none"}} onClick={()=>setIsSubmissionsWindowDisplayed(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"/></svg>                            
                                <span>{homework.submissions} Submission{ (homework.submissions > 1 || homework.submissions == 0)  && "s"}</span>
                            </div>
                        }
        
        
                    </div>
                    {
                        logData.role == "student" &&
                        <button onClick={handleHomeworkTurnIn} className={(homework.pastdue || turnedIn) ? "post-button past-due" : "post-button"} style={{marginTop: "auto", width: "80px", height: "25px", borderRadius: "25px"}}>{ turnedIn ? "Turned in" : (homework.pastdue ? "Past Due" : "Turn in")}</button>
                    }
                    </div>
                    
                    
                    
                    
                </div>
                
                </div> 
            </>

        );
    }
  
};

export default Homework;