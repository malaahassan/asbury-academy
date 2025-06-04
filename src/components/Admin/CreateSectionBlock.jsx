import React, { useEffect, useState } from 'react'
import Field from '../Tools/Field';

const CreateSectionBlock = ({type, onValuesChange, elem, onDelete, no_delete}) => {
        const [selectedSection, setSelectedSection] = useState(elem.section);
        const [selectedPassages, setSelectedPassages] = useState(elem.passages > 0 ? true : false);
        const [passages, setPassages] = useState(elem.passages);
        const [sectionOptions, setSectionOptions] = useState([]);
        const [questions, setQuestions] = useState(elem.questions);
        const [duration, setDuration] = useState(elem.duration);
        useEffect(()=>{
                const values = {id: elem.id, section: selectedSection, questions: questions, duration: duration, passages: passages};
                onValuesChange(values);
        }, [selectedSection, questions, duration, passages]);

        useEffect(()=>{
                setPassages(0);
        }, [selectedPassages]);

        useEffect(()=>{
                if(sectionOptions.length > 0){
                        setSelectedSection(sectionOptions[0].value);
                }
        }, [sectionOptions]);

        useEffect(()=>{
                if(type == "act") {
                        setSectionOptions([
                                { value: 'English', displayName: 'English' },
                                { value: 'Reading', displayName: 'Reading' },
                                { value: 'Math', displayName: 'Math' }
                        ]);
                } else if(type == "sat"){
                        setSectionOptions([
                                { value: 'Reading', displayName: 'Reading' },
                                { value: 'Writing', displayName: 'Writing' },
                                { value: 'Math With Calc', displayName: 'Math With Calc' },
                                { value: 'Math Without Calc', displayName: 'Math Without Calc' },
                        ]);
                }  else if(type == "est"){
                        setSectionOptions([
                                { value: 'Literacy I', displayName: 'Literacy I' },
                                { value: 'Literacy II', displayName: 'Literacy II' },
                                { value: 'Math With Calc', displayName: 'Math With Calc' },
                                { value: 'Math Without Calc', displayName: 'Math Without Calc' },
                        ]);
                }   else if(type == "digitalsat"){
                        setSectionOptions([
                                { value: 'Reading and Writing', displayName: 'Reading and Writing' },
                        ]);
                        setSelectedSection('Reading and Writing');
                } else {
                        setSectionOptions([
                                { value: 'Workout', displayName: 'Workout' },
                        ]);
                        
                }
                
        }, [type]);
        
        return (
            <div className='create-section-block universal-delete-button-container'>
                {!no_delete &&
                        <button onClick={()=> onDelete(elem.id)}
                                className="universal-delete-button"
                                style={{
                                display: "flex",
                                border: "1px solid rgb(221, 221, 221)",
                                top: 10,
                                right: 15,
                                }}
                                >
                                <svg
                                clipRule="evenodd"
                                fillRule="evenodd"
                                strokeLinejoin="round"
                                strokeMiterlimit={2}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                                fillRule="nonzero"
                                />
                                </svg>
                        </button>
                }
                
                <Field label="Section" value={selectedSection}  type='dropdown' onChange={setSelectedSection} id={`test-section-edit-${elem.id}`} options={sectionOptions}/>
                <Field label="Passages" value={selectedPassages}  type='dropdown' onChange={setSelectedPassages} id={`test-section-passages-edit-${elem.id}`} options={[
                                { value: false, displayName: 'Not included' },
                                { value: true, displayName: 'Included' },
                                
                ]}/>
                {
                        selectedPassages && 
                        <Field label="Passages count" value={passages}  type='number' onChange={(e)=> setPassages(e.target.value)} />

                }
                <Field label="Questions count" value={questions}  type='number' onChange={(e)=> setQuestions(e.target.value)} />
                <Field label="Duration (mins)" value={duration}  type='number' onChange={(e)=> setDuration(e.target.value)} />
                


            </div>
        );
}
export default CreateSectionBlock;