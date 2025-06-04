import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import Field from '../Tools/Field';
import CreateSectionBlock from '../Admin/createSectionBlock';
import { useXHR } from "../Contexts/UseXHR";


const CreateTestWindow = ({refetch, onClose}) => {
        const { sendRequest } = useXHR();
    
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const errorsBox = useRef();

        const testInfoRef = useRef({
            name: "",
            code: "",
            type: "",
            interface: "",
            date: "",
            sections: []
        });
        

        const [sections, setSections] = useState([]);
        const [testType, setTestType] = useState("act");
        const [testInterface, setTestInterface] = useState("act");
        const saveTimeout = useRef();
       



        useEffect(()=>{
            testInfoRef.current.sections = JSON.stringify(sections);
            testInfoRef.current.type = testType;
            testInfoRef.current.interface = testInterface;
            console.log(testInfoRef)
        }, [sections, testType, testInterface]);

        


        function handleSaveClick(){

            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/create_test.php",
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

        
          function handleCreateSectionClick(){
            const newSection = {id: sections[sections.length - 1]? sections[sections.length - 1].id + 1 : 0, section: null, questions: 0, duration: 0, passages: 0};
            setSections(prevItems => [...prevItems, newSection]);
          }

          function handleSectionValuesChange(values){

            setSections(prevItems =>
                prevItems.map(item =>
                  item.id === values.id ? values : item
                )
            );
            
          }

          function handleSectionDelete(index){
            setSections(prevItems =>
                prevItems.filter(item =>
                  item.id !== index
                )
            );
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
                        Create test
                        </h1>
                        
                        <div  className='edit-account-form-block'>
                            <h1 className="edit-account-header">Test Info.</h1>
                            <Field label="Name" value={testInfoRef.current.name}  type='text' onChange={(e)=>{testInfoRef.current.name = e.target.value}} />
                            <Field label="Abbreviation" value={testInfoRef.current.code} type='text' onChange={(e)=>{testInfoRef.current.code = e.target.value}} />
                            <Field label="Release date" value={testInfoRef.current.date}  type='date' onChange={(e)=>{testInfoRef.current.date = e.target.value}} />
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
                        <div className='hr'></div>
                        
                        <div  className='edit-account-form-block'>
                            
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h1 className="edit-account-header">Sections</h1>
                                <button className="create-account-btn create-section-btn" onClick={handleCreateSectionClick}>
                                    <svg
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        strokeLinejoin="round"
                                        strokeMiterlimit={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                                        fillRule="nonzero"
                                        />
                                    </svg>
                                    <span>Add section</span>
                                </button>

                            </div>
                            <div className="create-sections-container">
                                {sections.map((elem) => 
                                        <CreateSectionBlock key={elem.id} elem={elem} type={testType} onValuesChange={(values)=>handleSectionValuesChange(values)} onDelete={handleSectionDelete}/>
                                )}
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
                        <button onClick={handleSaveClick}>Create</button>
                    </div>
                </div>
            </div>,
      
            document.body
        );
}
export default CreateTestWindow;