import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { useXHR } from "../Contexts/UseXHR";


const EditEmailWindow = ({update, onClose, email}) => {
        const { sendRequest } = useXHR();
    
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const errorsBox = useRef();

        const emailRef = useRef(email);
        
        const saveTimeout = useRef();
       

        


        function handleSaveClick(){

            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/edit_my_email.php",
                {email: emailRef.current},
                saveTimeout,
                (response) => {
                    update(response);
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
                <div className="window change-personal-info-window">
                    <h2 className="change-password-header">Change your email</h2>
                    <div className="edit-account-form">
                        <div className="uniqueField-parent required">
                            <span className="uniqueField-title">Email address</span>
                            <input defaultValue={emailRef.current} className="uniqueField" type="text" name='edit_email' onChange={(e)=>{emailRef.current = e.target.value}}/>
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
                    <div className="hr-buttons-container">
                        <div className="hr" ></div>
                        <div className="cropper-btn-container" style={{ marginTop: "1rem", pointerEvents: saveLoading && "none", opacity: saveLoading && "0.7"}}>
                            <button className="danger" onClick={() => { onClose() }}>Cancel</button>
                            <button onClick={handleSaveClick}>Save</button>
                        </div>
                    </div>
                    
                </div>
            </div>,
      
            document.body
        );
}
export default EditEmailWindow;