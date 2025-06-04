import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import Field from '../Tools/Field';
import CreateSectionBlock from '../Admin/createSectionBlock';
import { useXHR } from "../Contexts/UseXHR";


const AddTestSectionWindow = ({refetch, onClose, id, type}) => {
        const { sendRequest } = useXHR();
    
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const errorsBox = useRef();

        const testInfoRef = useRef({
            id: id,
            section: null,
            questions: 0,
            duration: 0,
            passages: 0
        });

        const saveTimeout = useRef();

        function handleSaveClick(){

            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/add_test_section.php",
                testInfoRef.current,
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

        
        function handleSectionValuesChange(values){
            testInfoRef.current.section = values.section;
            testInfoRef.current.questions = values.questions;
            testInfoRef.current.duration = values.duration;
            testInfoRef.current.passages = values.passages;
        }

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
                        Add new section
                        </h1>
                        
                        <div  className='edit-account-form-block'>
                            <div className="create-sections-container">
                                <CreateSectionBlock elem={testInfoRef.current} type={type} onValuesChange={(values)=>handleSectionValuesChange(values)} no_delete={true} />
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
export default AddTestSectionWindow;