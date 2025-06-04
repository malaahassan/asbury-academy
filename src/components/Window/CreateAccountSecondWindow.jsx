import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import DropDown from '../Tools/DropDown';
import EditAccountPictureWindow from './EditAccountPictureWindow';
import { useXHR } from "../Contexts/UseXHR";

const CreateAccountSecondWindow = ({refetch, onClose, dropdown_groups}) => {
    const { sendRequest } = useXHR();
    
    const [responseErrors, setResponesErrors] = useState([]);
    const [saveLoading, setSaveLoading] = useState(false);
    const errorsBox = useRef();

    const userData = useRef({
        username:"",
        firstName:"",
        lastName:"",
        birthDate:"",
        gender:"Male",
        class: "",
        email:"",
        password: Math.random().toString(36).substring(2, 8),
        phoneNumber:"",
        pfp:null,
        cover:null
    })


        const  [selectedGender, setSelectedGender] = useState(userData.current.gender);
        const  [selectedGroup, setSelectedGroup] = useState(dropdown_groups[0].value);
        const [selectedTeachingClasses, setSelectedTeachingClasses] = useState([]);
        const [editPictureWindow, setEditPicutureWindow] = useState(false);
        const [subjects, setSubjects] = useState([]);

        const pfpBlob = useRef(); 
        const coverBlob = useRef()
        const pfpInputRef = useRef()
        const coverInputRef = useRef()
        const coverImageRef = useRef()
        const profileImageRef = useRef()
        const [photoType, setPhotoType] = useState()
        const [coverPhoto, setCoverPhoto] = useState(null)
        const [profilePhoto, setProfilePhoto] = useState(null)

        const [profileUploading, setProfileUploading] = useState(false);
        const [coverUploading, setCoverUploading] = useState(false);

        const profileTimeout = useRef();
        const coverTimeout = useRef();
        const saveTimeout = useRef();
       
        function handleImageInput(file, type){
            let blobURL = URL.createObjectURL(file);
            const formData = new FormData();
            formData.append('image', file);
            //setError({error: "refuse", list: response.errors, message: `ON_REFUSE ${xhr.status}`});
            console.log(formData)
            if(type == "profile"){
                sendRequest(
                    ()=>{
                        setResponesErrors([]);
                        setProfileUploading(true);
                    },
                    "/back/upload_profile.php",
                    formData,
                    profileTimeout,
                    (response) => {
                        profileImageRef.current.src = blobURL;
                        userData.current.pfp = [response.id, response.path]; 
                    },
                    () => {
                        setProfileUploading(false);
                    },
                    (errors) => {
                        setResponesErrors(errors);
                    }
                    
                  );
            } else {
                sendRequest(
                    ()=>{
                        setResponesErrors([]);
                        setCoverUploading(true);
                    },
                    "/back/upload_cover.php",
                    formData,
                    coverTimeout,
                    (response) => {
                        coverImageRef.current.style.backgroundImage = `url(${blobURL})`;
                        userData.current.cover = [response.id, response.path];
                    },
                    () => {
                        setCoverUploading(false);
                    },
                    (errors) => {
                        setResponesErrors(errors);
                    }
                    
                  );
            }
            
      
        }

        useEffect(()=>{
            if(profilePhoto){
                handleImageInput(profilePhoto, "profile");
                userData.current.pfp = profilePhoto;
            }
            
           
        }, [profilePhoto]);

        useEffect(()=>{
            if(coverPhoto){
                handleImageInput(coverPhoto, "cover");
                userData.current.cover = coverPhoto;
            }
            
        }, [coverPhoto]);


        /*useEffect(()=>{
            if(role ==='student')
                userData.current.registeredSubjects = subjects.map(({subject})=> subject)
            else if(role ==='teacher')
                userData.current.teachingSubjects = subjects.map(({subject})=>subject)
        }, [subjects])*/


        /*useEffect(()=>{
            if(role === 'teacher')
                userData.current.teachingClasses = selectedTeachingClasses.map((grade)=>{ return(grade.value)})
          
                
            },[selectedTeachingClasses])

        useEffect(()=>{
            userData.current.gender = selectedGender;
        },[selectedGender]);*/

        useEffect(()=>{
            userData.current.group = selectedGroup;
        },[selectedGroup]);



        const addSubject = (e) => {
            e.preventDefault();

            const defaultDropdown1 = dropdown_sections[0].value;
           
            const defaultDropdown2 = dropdown_subjects.find(option => option.subject === defaultDropdown1).options[0].value;

            setSubjects([...subjects, { id: `${Math.random() * 10}F${Date.now()}`, category: defaultDropdown1, subject: defaultDropdown2 }]);
        };

        const removeSubject = (id) => {
            setSubjects(subjects.filter(subject => subject.id !== id));
        };

        const handleDropdown1Change = (id, newValue) => {
            // When dropdown1 changes, reset dropdown2 to the first option of the new subject
            const newDropdown2 = dropdown_subjects.find(option => option.subject === newValue).options[0].value;
            setSubjects(subjects.map(subject =>
                subject.id === id ? { ...subject, category: newValue, subject: newDropdown2 } : subject
            ));
        };

        const handleDropdown2Change = (id, newValue) => {
            setSubjects(subjects.map(subject =>
                subject.id === id ? { ...subject, subject: newValue } : subject
            ));
        };

        const getDropdown2Options = (dropdown1Value) => {
            // Find the corresponding options for dropdown2 based on the selected dropdown1 value
            const foundOptions = dropdown_subjects.find(option => option.subject === dropdown1Value);
            return foundOptions ? foundOptions.options : [];
        };

        const SubjectField = ({subject, number})=>{
            return(
                <>  
        
                    <div className='edit-subject-field only-subject-field'>
                        <div className="accounts-name-header">
                            <h1 style={{ fontSize: '17px', minWidth:'90px' }}>{`Subject ${number}`} </h1>
                        </div>
                        <DropDown
                            options={dropdown_sections}
                            value={subject.category}
                            onChange={(value) => handleDropdown1Change(subject.id, value)}
                            sections={[]}
                            menuId={`dropdown1-${subject.id}`}
                        />   

                        {/* Second Dropdown based on first dropdown selection */}
                        <DropDown
                            options={getDropdown2Options(subject.category)}
                            value={subject.subject}
                            onChange={(value) => handleDropdown2Change(subject.id, value)}
                            sections={[]}
                            menuId={`dropdown2-${subject.id}`}
                            disabled={!subject.category} // Disable until first dropdown has a value
                        />
                        
                        <button form='' onClick={() => removeSubject(subject.id)} className="my-post-image-remove-button" style={{ display: 'flex', opacity:'1' ,position:'static', width:'30px', height:'30px', minWidth:'30px', minHeight:'30px', border:'solid 1px #f3f3f3' }}>
                            <svg style={{width:'18px', height:'18px'}}clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"></path>
                            </svg>
                        </button>
    
                    </div>
                </>
            )
        }
        
        const Field = ({ label, value, onChange, type }) => {
            return(
            <div className='account-input-field'>
                <div className="accounts-name-header">
                    <h1 style={{ fontSize: '17px' }}>{label}</h1>
                    <svg className="settings-arrow" style={{ transform: 'rotate(0deg)' }} fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z" />
                    </svg>
                </div>
                {type === 'gender' &&
                <DropDown
                options={[
                    { value: 'Male', displayName: 'Male' },
                    { value: 'Female', displayName: 'Female' },
                ]}
                value={selectedGender}
                onChange={setSelectedGender} 
                sections={[]}
                menuId={'accont-edit-gender'}
                />}            
                {type === 'group' &&
                <DropDown
                options={dropdown_groups}
                value={selectedGroup}
                onChange={setSelectedGroup} 
                sections={[]}
                menuId={'accont-edit-group'}
                />}    
                {(type != 'grade' && type != 'group' && type != 'gender') &&
                    <input type={type} defaultValue={value} onChange={onChange} />
                }
              
                
            </div>
        )};

        function previewPfP(e){
            setResponesErrors([]);
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
                setPhotoType('profile');
                setEditPicutureWindow(true);
                pfpBlob.current = URL.createObjectURL(file);
            } else {
                setResponesErrors(["The uploaded profile has to be an image."]);
            }

        }
        function previewCover(e){
            setResponesErrors([]);
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
                setPhotoType('cover');
                setEditPicutureWindow(true);
                coverBlob.current = URL.createObjectURL(file);
            } else {
                setResponesErrors(["The uploaded cover has to be an image."]);
            }
        }
        function onPhotoDiscard (){
            pfpBlob.current = null;
            coverBlob.current = null;
            pfpInputRef.current.value =null;
            coverInputRef.current.value =null;
            setEditPicutureWindow(false)
        }

        function saveTeachingGrade (value, i ){
            const arr = [...selectedTeachingClasses]
            arr.splice(i, 1, {value:value, displayName:`Grade ${value}`})
            setSelectedTeachingClasses([...arr])
        }
        function removeTeachingGrade(i){
            const arr = [...selectedTeachingClasses]
            arr.splice(i, 1)
            setSelectedTeachingClasses([...arr])
        }
        function addGrade(){
            const arr = [...selectedTeachingClasses, {value: dropdown_classes[0].value, displayName: dropdown_classes[0].displayName}];
            setSelectedTeachingClasses(arr)
        }

        function handleSaveClick(){
            

            sendRequest(
                ()=>{
                    setSaveLoading(true);
                    setResponesErrors([]);
                },
                "/back/create_account.php",
                {
                    data: JSON.stringify(userData.current)
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

        return ReactDOM.createPortal(
            <>
            { editPictureWindow && <EditAccountPictureWindow onClose={onPhotoDiscard} previewPfp={pfpBlob.current}  previewCover={coverBlob.current} firstName={userData.current.firstName} type={photoType} setCoverPhoto={setCoverPhoto}  setProfilePhoto={setProfilePhoto}/>}
            <div className="window-container">
                <div className="window" style={{ width: '600px', alignItems: 'start', minHeight:'75vh'}}>
                    <div className='pfp-cover-wrapper'>
                        
                        <div ref={coverImageRef} className='cover-photo' style={{ backgroundImage: 'url(/back/covers/cover.jpg)', position: 'relative' }}>
                            <div className="pfp-overlay-container" style={{display: coverUploading ? "flex" : "none", zIndex: 0}}>
                                <div className="pfp-overlay"></div>
                                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                            <label className='cover-btn' htmlFor='edit-account-cover-input' style={{ zIndex: "1", pointerEvents: coverUploading && "none", opacity: coverUploading && "0.5" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z" /></svg>
                                <span>Edit cover photo</span>
                            </label>
                            <input type="file" accept='image/*' ref={coverInputRef} id='edit-account-cover-input' style={{ display: 'none' }}  onChange={previewCover}/>
                        </div>
                        <div className="pfp-wrapper" style={{ position: 'relative'}}>
                            <div className="pfp-second-wrapper">
                                <div className="pfp-overlay-container" style={{display: profileUploading ? "flex" : "none"}}>
                                    <div className="pfp-overlay"></div>
                                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <img  ref={profileImageRef}  src={"/back/profiles/profile.jpg"} alt="" className='pfp' />
                            </div>
                            <label htmlFor="edit-account-pfp-input" className="pfp-label" style={{ pointerEvents: profileUploading && "none", opacity: profileUploading && "0.8", zIndex: '2', right: '0px', bottom: '0px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z" /></svg>
                            </label>
                            <input type="file" id="edit-account-pfp-input" ref={pfpInputRef} accept='image/*' style={{ display: 'none' }} onChange={previewPfP} />
                        </div>

                        <div className='hr'></div>
                    </div>

                    <form className="edit-account-form">
                        <div  className='edit-account-form-block'>
                            <Field label="Username" value={userData.current.username}  type='text' onChange={(e)=>{userData.current.username = e.target.value}}/>
                            <Field label="First name" value={userData.current.firstName}  type='text' onChange={(e)=>{userData.current.firstName = e.target.value}} />
                            <Field label="Last name" value={userData.current.lastName }  type='text' onChange={(e)=>{userData.current.lastName = e.target.value}} />
                            <Field label="Date of birth" value={userData.current.birthDate}  type='date' onChange={(e)=>{userData.current.birthDate = e.target.value}}/>
                            <Field label="Gender" value={userData.current.gender} type='gender'   /> 
                            <Field label="Group" value={userData.current.group} onChange={(e)=>{userData.current.group = e.target.value}} type={'group'}  />
                            <Field label="Email address" value={userData.current.email}  type='email' onChange={(e)=>{userData.current.email = e.target.value}} />
                            <Field label="password" value={userData.current.password}  type='text' onChange={(e)=>{userData.current.password = e.target.value}} />
                            <Field label="phone number" value={userData.current.phoneNumber} type='tel'  onChange={(e)=>{userData.current.phoneNumber = e.target.value}} />
                        </div>
                        {/* { (role === 'teacher' || role==="student")  &&
                            <>
                            <div className='hr'></div>
                            <div  className='edit-account-form-block'>
                                <div className='edit-subjects-header-wrapper'>
                                    <h1 className='edit-account-header'> {role === 'teacher' && 'Teaching ' }Subjects</h1>
                                    <button className="edit-account-btn" form='' onClick={addSubject}>
                                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"></path></svg>
                                        <span>Add subject</span>    
                                    </button>
                                </div>
                                {subjects.map((subject, index)=><SubjectField key={Math.random()} subject={subject} number={index + 1}/>)}
                            </div> 
                            <div className='hr'></div>
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

                    </form>
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
            </div>
            </>,
      
            document.body
        );
}
export default CreateAccountSecondWindow;