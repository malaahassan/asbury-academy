import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import Field from '../Tools/Field';
import CreateSectionBlock from '../Admin/createSectionBlock';
import { useXHR } from "../Contexts/UseXHR";


const EditTestInfoWindow = ({refetch, onClose, id, name, code, date, test_interface, type}) => {
        const { sendRequest } = useXHR();
    
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const errorsBox = useRef();

        const testInfoRef = useRef({
            id: id,
            name: name,
            code: code,
            date: date
        });
        

        const [testType, setTestType] = useState(type);
        const [testInterface, setTestInterface] = useState(test_interface);
        const saveTimeout = useRef();
       

        


        function handleSaveClick(){

            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/edit_test.php",
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
                        Edit test info.
                        </h1>
                        
                        <div  className='edit-account-form-block'>
                            <Field label="Name" value={testInfoRef.current.name}  type='text' onChange={(e)=>{testInfoRef.current.name = e.target.value}} />
                            <Field label="Abbreviation" value={testInfoRef.current.code} type='text' onChange={(e)=>{testInfoRef.current.code = e.target.value}} />
                            <Field label="Release date" value={testInfoRef.current.date}  type='date' onChange={(e)=>{testInfoRef.current.date = e.target.value}} />
                            <div style={{display: "flex", flexDirection: "column", gap: "1.7em", pointerEvents: "none", opacity: "0.5"}}>                  
                                <Field label="Type" value={testType}  type='dropdown' onChange={setTestType} id="test-edit-type" options={
                                    [
                                        { value: 'act', displayName: 'ACT Test' },
                                        { value: 'est', displayName: 'EST Test' },
                                        { value: 'sat', displayName: 'SAT Test' },
                                        { value: 'digitalsat', displayName: 'Digital SAT Test' },
                                        { value: 'reading_workout', displayName: 'Reading Workout' },
                                        { value: 'writing_workout', displayName: 'Writing Workout' },
                                    ]
                                }/>
                                <Field label="Interface" value={testInterface}  type='dropdown' onChange={setTestInterface} id='test-edit-interface' options={
                                    [
                                        { value: 'act', displayName: 'ACT Interface' },
                                        { value: 'est', displayName: 'EST Interface' },
                                        { value: 'digitalsat', displayName: 'Digital SAT Interface' },
                                    ]
                                }/>
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
export default EditTestInfoWindow;