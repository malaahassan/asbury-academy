import React, {useRef, useState, useContext, useEffect} from 'react';
import { Link } from "react-router-dom";
import EditProfileWindow from '../Window/EditProfileWindow';
import { LoginContext } from '../Contexts/LoginContext';
import Errors from '../Window/Errors';
import AlertWindow from '../Window/AlertWindow';
import { useXHR } from "../Contexts/UseXHR";



const ProfileInfo = ({ page, user_info, self_profile }) => {
  const { sendRequest } = useXHR();
  const [error, setError] = useState({error: null, message: null});
  const [alert, setAlert] = useState([]);

  const [editProfileWindow, setEditProfileWindow] = useState(false);
  const { logData, setLogData } = useContext(LoginContext);


  const pfpBlob = useRef(); 
  const coverBlob = useRef();
  const pfpInputRef = useRef();
  const coverInputRef = useRef();
  const coverImageRef = useRef();
  const profileImageRef = useRef();

  const [photoType, setPhotoType] = useState();
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [profileUploading, setProfileUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  const profileTimeout = useRef();
  const coverTimeout = useRef();
  
  function previewPfP(e){
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        setPhotoType('profile');
        setEditProfileWindow(true);
        pfpBlob.current = URL.createObjectURL(file);
    } else {
      setAlert(["The uploaded profile has to be an image."]);
    }

  }
  function previewCover(e){
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
          setPhotoType('cover');
          setEditProfileWindow(true);
          coverBlob.current = URL.createObjectURL(file);
      } else {
        setAlert(["The uploaded cover has to be an image."]);
      }
  }

  function onPhotoDiscard (){
      pfpBlob.current = null;
      coverBlob.current = null;
      pfpInputRef.current.value =null;
      coverInputRef.current.value =null;
      setEditProfileWindow(false);
  }

  function handleImageInput(file, type){
    if(type == "profile"){
        setProfileUploading(true);
        clearTimeout(profileTimeout.current);
    } else {
        setCoverUploading(true);
        clearTimeout(coverTimeout.current);
    }
    let blobURL = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append('image', file);

    if(type == "profile"){
      sendRequest(
        ()=>{
            setProfileUploading(true);
            setAlert([]);
        },
        "/back/upload_my_profile.php",
        formData,
        profileTimeout,
        (response) => {
            profileImageRef.current.src = blobURL;
            setLogData((prevState) => ({
              ...prevState,
              profile: response.fullpath,
              }));
        },
        () => {
            setProfileUploading(false);
        },
        (errors) => {
          setAlert(errors);
        }
        
      );
    } else {
      sendRequest(
        ()=>{
            setCoverUploading(true);
            setAlert([]);
        },
        "/back/upload_my_cover.php",
        formData,
        coverTimeout,
        (response) => {
            coverImageRef.current.src = blobURL;
            setLogData((prevState) => ({
              ...prevState,
              cover: response.fullpath,
              }));
        },
        () => {
            setCoverUploading(false);
        },
        (errors) => {
            setAlert(errors);
        }
        
      );
    }

  }

  useEffect(()=>{
      if(profilePhoto){
          handleImageInput(profilePhoto, "profile");
      }
      
    
  }, [profilePhoto]);

  useEffect(()=>{
      if(coverPhoto){
          handleImageInput(coverPhoto, "cover");
      }
      
  }, [coverPhoto]);


  return (
    <>
        <Errors error={error} onClose={()=> setError({error: null, message: null})}/>
        {alert.length > 0 && <AlertWindow alert={alert} onClose={() => setAlert([])} />}
        { editProfileWindow && <EditProfileWindow onClose={onPhotoDiscard} previewPfp={pfpBlob.current}  previewCover={coverBlob.current} type={photoType} setCoverPhoto={setCoverPhoto}  setProfilePhoto={setProfilePhoto}/>}      

        
        
        <div className="profile-info-container">
        <div ref={coverImageRef} className="profile-cover-photo" style={{ backgroundImage: `url('${self_profile ? logData.cover : user_info.cover}')` }}>
          <div className="pfp-overlay-container" style={{display: coverUploading ? "flex" : "none", zIndex: 0}}>
            <div className="pfp-overlay"></div>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
            {self_profile && 
            <>
              <label className='cover-btn' htmlFor='profile-cover-input'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"/></svg>
                <span>Edit cover photo</span>
              </label>
              <input ref={coverInputRef} type="file" accept='image/*' id='profile-cover-input' style={{ display: 'none' }}   onChange={previewCover}/>
            </> 
            }         
          </div>
        <div className="profile-user-info">
          
        <div className="pfp-wrapper" style={{ width: 170, height: 170, marginTop: "-2rem", marginLeft: 0 }}>
            <div className="pfp-second-wrapper">
                <div className="pfp-overlay-container" style={{display: profileUploading ? "flex" : "none", zIndex: 0}}>
                    <div className="pfp-overlay"></div>
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <img ref={profileImageRef} src={self_profile ? logData.profile : user_info.profile} className='profile-pfp' alt="" />
            </div>
            {
              self_profile &&
              <>
                <label htmlFor="pfp-input" className="pfp-label" style={{ pointerEvents: profileUploading && "none", opacity: profileUploading && "0.8", zIndex: '2', right: '0px', bottom: '0px'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"/></svg>
                </label>
                <input type="file" id="pfp-input" accept='image/*' ref={pfpInputRef} style={{ display: 'none' }} onChange={previewPfP}/>
              </>
            }

          </div>
          <div className="name-and-bio">
            <div className="post-user-header-name">
              <h1>{self_profile ? logData.user_first_name : user_info.user_first_name} {self_profile ? logData.user_last_name : user_info.user_last_name}</h1> 
              { ((self_profile && logData.admin) || (!self_profile && user_info.admin)) && 
                      <span className="user-header-tag admin-tag" title="Administrator">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 19v3h-20v-3h20zm0-15c-1.5 0-2.662 1.685-1.598 3.194.535.759.406 1.216.045 1.749-.765 1.127-1.872 2.057-3.447 2.057-2.521 0-3.854-2.083-4.131-3.848-.096-.614-.15-1.074.436-1.644.402-.39.695-.904.695-1.508 0-1.104-.896-2-2-2s-2 .896-2 2c0 .604.293 1.118.695 1.508.586.57.531 1.03.436 1.644-.277 1.765-1.61 3.848-4.131 3.848-1.575 0-2.682-.93-3.447-2.058-.362-.532-.491-.989.045-1.748 1.064-1.509-.098-3.194-1.598-3.194-1.104 0-2 .896-2 2 0 .797.464 1.495 1.144 1.808.825.38.856 1.317.856 2.171v7.021h20v-7.021c0-.854.031-1.792.856-2.171.68-.313 1.144-1.011 1.144-1.808 0-1.104-.896-2-2-2z"></path></svg>
                      </span>
              }
              { ((self_profile && logData.developer) || (!self_profile && user_info.developer)) && 
                <span className="user-header-tag developer-tag" title="Developer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10.935v2.131l-10 4.934v-2.23l7.64-3.77-7.64-3.779v-2.221l10 4.935zm-24 0v2.131l10 4.934v-2.23l-7.64-3.77 7.64-3.779v-2.221l-10 4.935z"/></svg>
                </span>
              }
            </div>
            <div className="user-general-info">
                @{self_profile ? logData.username : user_info.username}
            </div>
              
            
          </div>
        </div>
        { self_profile && 
        <>
          <div className="hr"></div>
          <nav className="profile-nav">
            <Link to={`/community/profiles/${self_profile ? logData.username : user_info.username}`} className={page === 'profiles' ? "active-link" : ''}>Posts</Link>
            <Link to={'/community/favourites'} className={page === 'favourites' ? "active-link" : ''}>Saved</Link>
          </nav>
        </>

        }
        
        </div>

    </>
  )
}

export default ProfileInfo;