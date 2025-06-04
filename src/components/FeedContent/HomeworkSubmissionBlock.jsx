import React, { useState } from 'react';
import Attachment from './Attachment';

const HomeworkSubmissionBlock = ({ firstName, lastName, date, attachments, notes, pfp }) => {
    const [isBlockExpanded, setIsBlockExpanded] = useState(false);
    const [isAttachmentsExpanded, setIsAttachmentsExpanded] = useState(false);
    const [isNotesExpanded, setIsNotesExpanded] = useState(true);

    return (
        <div className='submission-block'>
            <div className='submitter-wrapper'>
                <img src={pfp} alt="" className='pfp' style={{ width: '70px', height: '70px' }} />
                <div className='submitter-info'>
                    <div className="submitter-name-container" style={{ userSelect: 'none' }} onClick={() => { setIsBlockExpanded(prev => !prev) }}>
                        <span style={{ pointerEvents: 'none' }}>{firstName} {lastName}</span>
                        <svg style={isBlockExpanded ? { transform: 'rotate(-90deg)', transition: 'all 0.25s' } : { transition: 'all 0.25s' }} className="settings-arrow" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path>
                        </svg>
                    </div>
                    <span style={{ fontSize: '14px', opacity: '0.8' }}>{date}</span>
                    <span style={{ fontSize: '12px', opacity: '0.8' }}>{attachments.length} Attachment{ (attachments.length > 1 || attachments.length == 0)  && "s"}</span>
                </div>
            </div>

            <div className="submission-info-container" style={isBlockExpanded ? { maxHeight: `${((attachments.length + 1 ) * 150)}px` } : { maxHeight: '0px' }}>
                <div className='hr' style={{ margin: '0px', marginBottom: '18px' }}></div>
                
                <div className="submitter-name-container submission-expander" style={{ userSelect: 'none' }} onClick={() => { setIsNotesExpanded(prev => !prev) }}>
                    <span style={{ pointerEvents: 'none', fontSize: '15px', fontWeight: '500' }}>Note</span>
                    <svg style={isNotesExpanded ? { transform: 'rotate(-90deg) scale(0.8)' } : { transform: 'rotate(90deg) scale(0.8)' }} className="settings-arrow" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path style={{ width: '100%', height: '100%' }} d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path>
                    </svg>
                </div>

                <div className='submitted-notes-container' style={isNotesExpanded ? { maxHeight: '500px', transition: '0.3s' } : { maxHeight: '0px', overflow: 'hidden', transition: '0.3s' }}>
                    {notes != ""
                    ? <p style={{ fontSize: '13px', margin: '0px', opacity: '0.95', lineHeight: '20px' }}>{notes}</p>
                    : <span style={{fontSize:'13px', marginLeft:'0.3rem', opacity:'0.8'}}>No notes were added</span>

                    }
                </div>
                <div className="submitter-name-container submission-expander" style={{ userSelect: 'none' }} onClick={() => { setIsAttachmentsExpanded(prev => !prev) }}>
                    <span style={{ pointerEvents: 'none', fontSize: '15px', fontWeight: '500' }}>Attachments</span>
                    <svg style={isAttachmentsExpanded ? { transform: 'rotate(-90deg) scale(0.8)' } : { transform: 'rotate(90deg) scale(0.8)' }} className="settings-arrow" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z"></path>
                    </svg>
                </div>
                <div className='submitted-attachments-container' style={isAttachmentsExpanded ? {maxHeight: `${((attachments.length + 1 ) * 80)}px` } : {}}>
                    {attachments.length != 0 
                    ? 
                    attachments.map((file, index) => (
                        <Attachment key={index} file={file.info} />
                    ))
                    :
                    <span style={{fontSize:'13px', marginLeft:'0.2rem', opacity:'0.8'}}>No Attachments were submitted</span>
                }
                </div>
                <div style={{height: "10px"}}></div>
                
            </div>
        </div>
    );
}

export default HomeworkSubmissionBlock;
