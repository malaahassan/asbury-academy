import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import Field from '../Tools/Field';
import { useXHR } from "../Contexts/UseXHR";


const EditVideoInfoWindow = ({refetch, onClose, id, title, description}) => {
        const { sendRequest } = useXHR();
    
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const errorsBox = useRef();

        const videoInfoRef = useRef({
            id: id,
            title: title,
            description: description,
        });
        

        const saveTimeout = useRef();
       

        
        function handleSaveClick(){

            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/edit_video.php",
                videoInfoRef.current,
                saveTimeout,
                (response) => {
                    refetch();
                    onClose();
                },
                () => {
                    setSaveLoading(false);
                },
                (errors) => {
                    setResponesErrors(errors);
                }
                
              );
        }

        useEffect(() => {
            if (responseErrors.length > 0 && errorsBox.current) {
                errorsBox.current.scrollIntoView({
                    behavior: 'smooth', // Smooth scrolling animation
                    block: 'start', // Aligns the element at the top of the viewport
                  });
            }
          }, [responseErrors]);

        
          

        return ReactDOM.createPortal(
            <div className="window-container">
                <div className="window" style={{ width: '600px', alignItems: 'start', height: "max-content"}}>
                    <div className="edit-account-form">
                        <h1
                        className="dashboard-header"
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: 30,
                            fontSize: 26,
                            fontWeight: 500
                        }}
                        >
                        Edit video info.
                        </h1>
                        
                        <div  className='edit-account-form-block'>
                            <Field label="Title" value={videoInfoRef.current.title}  type='text' onChange={(e)=>{videoInfoRef.current.title = e.target.value}} />
                            <div
                                className="account-input-field"
                                style={{ flexDirection: "column", alignItems: "flex-start" }}
                            >
                                <div className="accounts-name-header">
                                    <h1 style={{ fontSize: 17 }}>Description</h1>
                                </div>
                                <textarea
                                    style={{
                                        resize: "none",
                                        outline: "none",
                                        fontSize: 16,
                                        height: 120,
                                        border: "1px solid rgba(0, 0, 0, 0.1)",
                                        opacity: "0.8",
                                        width: "100%",
                                        fontFamily: '"Poppins"',
                                        boxSizing: "border-box",
                                        padding: 10
                                    }}
                                    defaultValue={videoInfoRef.current.description}
                                    onChange={(e)=>{videoInfoRef.current.description = e.target.value}}
                                />
                            </div>

                            
                            
                        </div>
                        
                        
                        

                    </div>
                    <div ref={errorsBox} id="errorsBox" style={{display: responseErrors.length > 0 ? "block" : "none", width: "100%"}}>
                        <div className="error-message">
                            <span>Please fix the following problem(s):</span>
                            <ul>
                                {
                                    responseErrors.map((error, index) => 
                                        <li key={index}>{error}</li>
                                    )
                                }
                                
                            </ul>
                        </div>
                    </div>
                    <div className="cropper-btn-container" style={{ marginTop: "3rem", pointerEvents: saveLoading && "none", opacity: saveLoading && "0.5"}}>
                        <button className="danger" onClick={() => { onClose() }}>Cancel</button>
                        <button onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>,
      
            document.body
        );
}
export default EditVideoInfoWindow;