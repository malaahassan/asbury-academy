import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import DropDown from '../Tools/DropDown';
import SearchBar from '../Tools/SearchBar';
import AdditionalInfoBlock from '../Admin/AdditionalInfoBlock';
import AuthorizationBlock from '../Admin/AuthorizationBlock';
import { useXHR } from "../Contexts/UseXHR";


const EditGroupWindow = ({refetch, onClose, dropdown_subjects, dropdown_tests, default_tests, dropdown_videos, default_videos, group, description, id}) => {
        const { sendRequest } = useXHR();
        
        const [responseErrors, setResponesErrors] = useState([]);
        const [saveLoading, setSaveLoading] = useState(false);
        const [dropdownType, setDropdownType] = useState("act");
        const [searchTest, setSearchTest] = useState("");
        const [searchVideo, setSearchVideo] = useState("");
        const errorsBox = useRef();

        const groupRef = useRef(group);
        const descriptionRef = useRef(description);
        const testsRef = useRef([]);
        const videosRef = useRef([]);



        const [tests, setTests] = useState(default_tests);
        const [videos, setVideos] = useState(default_videos);
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
                "/back/edit_group.php",
                {
                    id: id,
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
                        Edit group
                        </h1>
                        
                        <div  className='edit-account-form-block'>
                            <h1 className="edit-account-header">Group Info.</h1>
                            <Field label="Group name" value={groupRef.current}  type='text' onChange={(e)=>{groupRef.current = e.target.value}} />
                            <Field label="Group description" value={descriptionRef.current } type='text' onChange={(e)=>{descriptionRef.current = e.target.value}} />
                            
                        </div>
                        <div className='hr'></div>
                        
                        <div  className='edit-account-form-block'>
                            <h1 className="edit-account-header">Authorization</h1>
                            <AdditionalInfoBlock title='Authorized Tests'>
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
                            <AdditionalInfoBlock title='Authorized Videos'>
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
                        {/* { (role === 'teacher' || role==="student")  &&
                            <>
                            
                        </>}
                        

                        { role ==='student' && 
                        <div  className='edit-account-form-block'>
                            <h1 className='edit-account-header'>Class</h1>
                            <Field label="Class" value={userData.current.class} onChange={(e)=>{userData.current.class = e.target.value}} type={'class'}  />
                        </div>}

                        { role === 'teacher'  &&
                        <>
                            <div  className='edit-account-form-block' style={{paddingBottom: "30px"}}>
                                <div className='edit-teaching-grades-header-wrapper' style={{display: 'flex', alignItems:'center'}}>
                                    <h1 className='edit-account-header'>Teaching Classes</h1>
                                    <button className="edit-account-btn" form='' style={{marginLeft:'auto'}} onClick={()=>{addGrade()}} >
                                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"></path></svg>
                                        <span>Add class</span>    
                                    </button>
                                </div>
                            { selectedTeachingClasses.map((grade, i)=>{
                                return(
                                  <React.Fragment key={`${Math.random()}${Date.now()}` } >
                                    <div className='edit-subject-field only-class-field' style={{justifyContent:'space-between'}}>
                                        <div className="accounts-name-header">
                                            <h1 style={{ fontSize: '17px', minWidth:'90px' }}>{`Class ${i+1}`} </h1>
                                        </div>
                                        <DropDown
                                            options={dropdown_classes}
                                            value={grade.value}
                                            onChange={(v)=>{saveTeachingGrade(v, i)}}
                                            sections={[]}
                                            menuId={`teachingClasses-menu${i}`}
                                        />   
                                        <button form='' onClick={()=>{removeTeachingGrade(i)}}  className="my-post-image-remove-button" style={{ display: 'flex', opacity:'1' ,position:'static', width:'30px', height:'30px', minWidth:'30px', minHeight:'30px', border:'solid 1px #f3f3f3', marginLeft:'auto' }}>
                                            <svg style={{width:'18px', height:'18px'}}clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"></path>
                                            </svg>
                                        </button>
                                    </div>
                                 </React.Fragment >)})}
                            </div>
                       
      
                        </>
                        } */}
                        

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
export default EditGroupWindow;