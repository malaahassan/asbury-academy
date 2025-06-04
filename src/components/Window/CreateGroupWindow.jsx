import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import DropDown from '../Tools/DropDown';
import SearchBar from '../Tools/SearchBar';
import AdditionalInfoBlock from '../Admin/AdditionalInfoBlock';
import AuthorizationBlock from '../Admin/AuthorizationBlock';
import { useXHR } from "../Contexts/UseXHR";


const CreateGroupWindow = ({refetch, onClose, dropdown_subjects, dropdown_tests, dropdown_videos}) => {
        const { sendRequest } = useXHR();
    
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const [dropdownType, setDropdownType] = useState("act");
        const [searchTest, setSearchTest] = useState("");
        const [searchVideo, setSearchVideo] = useState("");
        const errorsBox = useRef();

        const groupRef = useRef("");
        const descriptionRef = useRef("");
        const testsRef = useRef([]);
        const videosRef = useRef([]);



        const [tests, setTests] = useState([]);
        const [videos, setVideos] = useState([]);
        const saveTimeout = useRef();
       



        useEffect(()=>{
            testsRef.current = tests;
        }, [tests]);

        useEffect(()=>{
            videosRef.current = videos;
        }, [videos]);

        

        
        
        const Field = ({ label, value, onChange, type }) => {
            return(
            <div className='account-input-field'>
                <div className="accounts-name-header">
                    <h1 style={{ fontSize: '17px' }}>{label}</h1>
                    <svg className="settings-arrow" style={{ transform: 'rotate(0deg)' }} fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z" />
                    </svg>
                </div>
                   

                <input type={type} defaultValue={value} onChange={onChange} />

              
                
            </div>
        )};

        function handleSaveClick(){

            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/create_group.php",
                {
                    group: groupRef.current,
                    description: descriptionRef.current,
                    authorization: JSON.stringify({tests: testsRef.current, videos: videosRef.current})
                },
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

          function handleTestCheck(id){
            setTests((prevItems) =>
                prevItems.includes(id)
                  ? prevItems.filter((item) => item !== id) // Remove if exists
                  : [...prevItems, id] // Add if not exists
            );
          }

          function handleVideoCheck(id){
            setVideos((prevItems) =>
                prevItems.includes(id)
                  ? prevItems.filter((item) => item !== id) // Remove if exists
                  : [...prevItems, id] // Add if not exists
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
                        Create group
                        </h1>
                        
                        <div  className='edit-account-form-block'>
                            <h1 className="edit-account-header">Group Info.</h1>
                            <Field label="Group name" value={groupRef.current}  type='text' onChange={(e)=>{groupRef.current = e.target.value}} />
                            <Field label="Group description" value={descriptionRef.current } type='text' onChange={(e)=>{descriptionRef.current = e.target.value}} />
                            
                        </div>
                        <div className='hr'></div>
                        
                        <div  className='edit-account-form-block'>
                            <h1 className="edit-account-header">Authorization</h1>
                            <AdditionalInfoBlock title='Authorized Tests' height={`calc(156px + ${dropdown_tests.filter((test) => (dropdownType == test.type) && (test.name.toUpperCase().includes(searchTest))).length}*(25px + 1rem))`}>
                                <div className="super-expanded-container group-authorization" style={{padding: 10}}>
                                    <div className="filters-container">
                                        <SearchBar onChange={(e)=>setSearchTest(e.target.value.toUpperCase())} />
                                        <DropDown
                                            options={dropdown_subjects}
                                            value={dropdownType}
                                            onChange={setDropdownType} 
                                            sections={[]}
                                            menuId={'tests-group-filter'}
                                        />
                                    </div>
                                
                                    <div className="settings-wrapper settings-wrapper-with-sub-wrappers">
                                        
                                            <div className="settings-sub-wrapper">
                                                {dropdown_tests
                                                    .filter(test =>
                                                        dropdownType === test.type &&
                                                        test.name.toUpperCase().includes(searchTest.toUpperCase())
                                                    )
                                                    .map(test => (
                                                        <AuthorizationBlock
                                                        key={test.id}
                                                        id={test.id}
                                                        title={test.name}
                                                        checked={tests.includes(test.id)}
                                                        onChange={() => handleTestCheck(test.id)}
                                                        />
                                                ))}
                                            </div>
                                    </div>
                                </div>
                            </AdditionalInfoBlock>

                            <AdditionalInfoBlock title='Authorized Videos' height={`calc(156px + ${dropdown_tests.filter((test) => (dropdownType == test.type) && (test.name.toUpperCase().includes(searchTest))).length}*(25px + 1rem))`}>
                                <div className="super-expanded-container group-authorization" style={{padding: 10}}>
                                    <div className="filters-container">
                                        <SearchBar onChange={(e)=>setSearchVideo(e.target.value.toUpperCase())} />
                                        
                                    </div>
                                
                                    <div className="settings-wrapper settings-wrapper-with-sub-wrappers">
                                        
                                            <div className="settings-sub-wrapper">
                                                {dropdown_videos.filter(video => video.name.toUpperCase().includes(searchVideo.toUpperCase())).map(video => (
                                                    <AuthorizationBlock
                                                        key={video.id}
                                                        id={video.id}
                                                        title={video.name}
                                                        checked={videos.includes(video.id)}
                                                        onChange={() => handleVideoCheck(video.id)}
                                                    />
                                                ))}
                                            </div>
                                    </div>
                                </div>
                            </AdditionalInfoBlock>
                                

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
export default CreateGroupWindow;