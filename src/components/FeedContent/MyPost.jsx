import React, { useEffect, useRef, useState, useContext } from 'react';
import UseOutsideClick from '../Window/UseOutsideClick';
import { LoginContext } from '../Contexts/LoginContext';
import Errors from '../Window/Errors';
import MyAttachment from './MyAttachment';
import DropDown from '../Tools/DropDown';
import EmojiPicker from "emoji-picker-react";
import AlertWindow from '../Window/AlertWindow';

function MyPost({getPosts}) {
  

  

  const { logData, setLogData } = useContext(LoginContext);

  
  const [error, setError] = useState({error: null, message: null});
  const [alert, setAlert] = useState([]);
  

  const textareaRef = useRef();
  const postLoadingRef = useRef();
  const attachmentMenuRef = useRef();
  const attachmentButtonRef = useRef();

  const emojiPickerContainerRef = useRef();
  const emojiPickerButtonRef = useRef();

  const postTimeout = useRef();
  const imageTimeout = useRef();

  const imageUploadPath = useRef(null);
  const fileUploadPath = useRef(null);

  const fileInputRef = useRef();



  const [isPostDoc, setIsPostDoc] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  
  const [postImageSrc, setPostImageSrc] = useState(null);
  const [imageUploadStroke, setImageUploadStroke] = useState(296.38525);
  const [imageUploaded, setImageUploaded] = useState(false);

  const [isPostLoading, setPostLoadingStatus] = useState(false);
  const [value, setValue] = useState('');
  //const [myPosts, setMyPosts] = useState([]);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);

  //UseOutsideClick(attachmentMenuRef, attachmentButtonRef, ()=>setIsAttachmentOpen(false));

  //EMOJI

  const [showPicker, setShowPicker] = useState(false);
  const handleEmojiClick = (emojiData) => {
    setValue((prev) => prev + emojiData.emoji);
    //setShowPicker(false); // Close picker after selection
  };

  UseOutsideClick(emojiPickerContainerRef, emojiPickerButtonRef, ()=>setShowPicker(false));


  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);


  function convertTo12HourFormat(time24) {
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 or 12 to 12

    return `${hours}:${minutes} ${ampm}`;
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', options);
  }

  

  function postClick(){

    clearTimeout(postTimeout.current);
    const postLoading = postLoadingRef.current;
    if( ( value.length > 0 && value != "" && (/[^\n]/.test(value)) ) || (postImageSrc && imageUploaded) || (isPostDoc && fileUploaded) ){
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/back/post.php");
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      setPostLoadingStatus(true);
      postLoading.style.width = "80%";
      postLoading.style.display = "block";
      xhr.send(`text=${encodeURIComponent(value.replace(/^\n+|\n+$/g, ''))}&activity=${encodeURIComponent("post")}&image_id=${imageUploadPath.current && encodeURIComponent(imageUploadPath.current[0])}&image_path=${imageUploadPath.current && encodeURIComponent(imageUploadPath.current[1])}&file_id=${fileUploadPath.current && encodeURIComponent(fileUploadPath.current.id)}&file_path=${fileUploadPath.current && encodeURIComponent(fileUploadPath.current.path)}&file_info=${fileUploadPath.current && encodeURIComponent(fileUploadPath.current.name)}`);
      xhr.onerror = () => postTimeout.current = setTimeout( ()=>postClick(), 2000);
      xhr.onload = function(){
        if(xhr.status == 200){
          try {
            let response = JSON.parse(xhr.responseText);
            postLoading.style.width = "100%";
            let timer;
            timer = setTimeout(function(){
              setPostLoadingStatus(false);
              postLoading.style.display = "none";
              /*setMyPosts((p) => [{
                post_id: response["post_id"],
                user_id: 1,
                user_first_name: "Mohamed",
                user_last_name: "Hassan",
                poster: "https://via.placeholder.com/50",
                activity: "post",
                text: value.replace(/^\n+|\n+$/g, ''),
                time: "just now",
                likes: 0,
                comments: 0,
                saves: 0,
                image: response["image"] && response["image"] 
              }, ...p]);*/
              getPosts();
              setValue("");
              removeAllAttachmentsFromPost();
              clearTimeout(timer);
            }, 500);
          } catch(err) {
            setError({retry: postClick, error: "parse", message: `ON_CATCH ${xhr.status}`});
          }
          
        } else {
          setError({retry: postClick, error: "connection", message: `ON_NOT_200 ${xhr.status}`});
        }
      }
    }
    
  }

  function handleImageInput(event){
      removeAllAttachmentsFromPost();
      clearTimeout(imageTimeout.current);
      let file = event.target.files[0];
      
      let blobURL = URL.createObjectURL(file);
      setPostImageSrc(blobURL);
      setImageUploaded(false);
      setImageUploadStroke(296.38525);
      const formData = new FormData();
      formData.append('image', file);
      
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            let percentComplete = (event.loaded / event.total) * 100;
            let stroke = 338.726 - (338.726*((event.loaded / event.total) - 0.25) ); 
            if(stroke > 296.38525){
              stroke = 296.38525;
            }
            
            if(percentComplete != 100){
              setImageUploadStroke(stroke);
            }

        } else {
          stroke = 296.38525;
          setImageUploadStroke(stroke);
        }
      };
      xhr.open("POST", "/back/upload_image.php");
      xhr.send(formData);
      xhr.onerror = () => imageTimeout.current = setTimeout( ()=>handleImageInput(event), 2000);
      
      xhr.onload = function(){
        if(xhr.status == 200){
          try {
            let response = JSON.parse(xhr.responseText);
            if(response.errors.length <= 0){
              imageUploadPath.current = [response.id, response.path];
              let timer = setTimeout(function(){
                let timer2 = setTimeout(function(){
                  event.target.value = "";
                  setImageUploaded(true);
                  clearTimeout(timer2);
                }, 310);
                setImageUploadStroke(0);
                clearTimeout(timer);
              }, 500);
            } else {
              setAlert(response.errors);
              setImageUploaded(true);
              setImageUploadStroke(0);
              setPostImageSrc(null);
            }
          } catch(err) {
            setError({retry: () => handleImageInput(event), error: "parse", message: `ON_CATCH ${xhr.status}`});
            setImageUploaded(true);
            setImageUploadStroke(0);
            setPostImageSrc(null);
          }
          
        } else {
          setError({retry: () => handleImageInput(event), error: "connection", message: `ON_NOT_200 ${xhr.status}`});
          setImageUploaded(true);
          setImageUploadStroke(0);
          setPostImageSrc(null);
        }
      }
      

  }

  

  

  function removeImagePhysically(){
    clearTimeout(imageTimeout.current);
    setPostImageSrc(null); 
    imageUploadPath.current = null;
  }
  

  //FROM ATTACHMENT COMPONENT

  function handleFileInput() {
    removeAllAttachmentsFromPost();
    setFileUploaded(false);
    setIsAttachmentOpen(false);
    setIsPostDoc(true);
    
  }

  function handleFileReady(file_info) {
    setFileUploaded(true);
    fileUploadPath.current = file_info;
  }

  function handleFileRemove(){
    setIsPostDoc(false);
  }



  function removeAllAttachmentsFromPost(){
    handleFileRemove();
    removeImagePhysically();
  }


  return (
    <>
      {alert.length > 0 && <AlertWindow alert={alert} onClose={() => setAlert([])} />}
      <Errors error={error} close={()=> setError({error: null, message: null})}/>

      <div className="post" style={{pointerEvents: isPostLoading || (postImageSrc && !imageUploaded) ?"none":"auto", zIndex: "2"}}>
        <div ref={postLoadingRef} className="post-loading"></div>
        
      <div className="post-header">
        <img className="post-header-poster" src={logData.profile} alt="User Photo" />
        <div className="post-user-header">
          <span className="post-user-header-name">{logData.user_first_name} {logData.user_last_name}</span>
          <div className="post-header-tiny-info">
            <span>@{logData.username}</span>
          </div>
        </div>
      </div>

      <textarea disabled={isPostLoading?true : null} onChange={(e) => setValue(e.target.value)} value={value} ref={textareaRef} onKeyDown={ function(e){if(e.key === 'Enter' && !e.shiftKey){e.preventDefault(); postClick();}} } type="text" id="posttext" name="posttext" placeholder="What's on your mind today?"></textarea>
      <div ref={emojiPickerContainerRef} className="emoji-picker-container">
        {showPicker && <EmojiPicker 
                        onEmojiClick={handleEmojiClick} 
                        emojiStyle="native" 
                        autoFocusSearch={false} 
                        suggestedEmojisMode="recent" 
                        previewConfig={{showPreview: false}}/> 
        }
      </div>
      
       
       
      
      <div className="my-post-image-container my-post-inside-container" style={{display: postImageSrc ? "flex":"none", cursor: "auto"}}>
        
        <div className="my-post-image-loading" style={{display: imageUploaded ? "none" : "flex"}}>
          <svg width="130" height="130" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="background-circle"></circle>
            <circle cx="60" cy="60" r="54" className="loading-circle" strokeLinecap="butt" style={{strokeDashoffset: imageUploadStroke}}></circle>
          </svg>
        </div>
        <button className="my-post-image-remove-button" onClick={removeImagePhysically} style={{display: imageUploaded ? "flex" : "none"}}>
          <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>

        </button>
        <img className="my-post-image" src={postImageSrc} />
        <div className="my-post-image-overlay" style={{backgroundImage: `url(${postImageSrc})`}} />
      </div>

      { isPostDoc &&
        <MyAttachment onAlert={(param)=>setAlert(param)} onError={(param)=>setError(param)} file={fileInputRef.current.files[0]} fileInputRef={fileInputRef} remove={handleFileRemove} ready={handleFileReady} accept={["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "odt"]}/>
      }

      

      <div id="post-attachments-container" style={{opacity: isPostLoading?"0.5":"1"}}>
          <div id="post-attachments">
              {/*<div ref={attachmentMenuRef} className="post-attachment-options" style={{display: isAttachmentOpen ? "block": "none"}}>
                <label htmlFor="documentInput" className="post-attachment-options-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.37 5.379l-5.64 5.64c-.655.655-1.515.982-2.374.982-1.855 0-3.356-1.498-3.356-3.356 0-.86.327-1.721.981-2.375l5.54-5.539c.487-.487 1.125-.731 1.765-.731 2.206 0 3.338 2.686 1.765 4.259l-4.919 4.919c-.634.634-1.665.634-2.298 0-.634-.633-.634-1.664 0-2.298l3.97-3.97.828.828-3.97 3.97c-.178.177-.178.465 0 .642.177.178.465.178.642 0l4.919-4.918c1.239-1.243-.636-3.112-1.873-1.874l-5.54 5.54c-.853.853-.853 2.24 0 3.094.854.852 2.24.852 3.093 0l5.64-5.64.827.827zm.637-5.379c.409.609.635 1.17.729 2h7.264v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-8.062c-.63.075-1 .13-2-.133v10.195h10.189c3.163 0 9.811-7.223 9.811-9.614v-14.386h-9.993zm4.993 6h-3.423l-.793.793-.207.207h4.423v-1zm0 3h-6.423l-1 1h7.423v-1zm0 3h-9.423l-.433.433c-.212.213-.449.395-.689.567h10.545v-1z"></path></svg>
                  <span>Document</span>
                </label>
                <input ref={fileInputRef} style={{display: "none"}} onChange={handleFileInput} type="file" id="documentInput" name="documentInput" accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .odt"></input>
                { (logData.role === "teacher" || logData.admin) &&
                  <button className="post-attachment-options-button" onClick={()=>setIsHomeworkDisplayed(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.706c-2.938-1.83-7.416-2.566-12-2.706v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872-1.314 6.729-1.875 10.666-1.995v-17.714c-4.584.14-9.062.876-12 2.706zm-10 13.104v-13.704c5.157.389 7.527 1.463 9 2.334v13.168c-1.525-.546-4.716-1.504-9-1.798zm20 0c-4.283.293-7.475 1.252-9 1.799v-13.171c1.453-.861 3.83-1.942 9-2.332v13.704zm-2-10.214c-2.086.312-4.451 1.023-6 1.672v-1.064c1.668-.622 3.881-1.315 6-1.626v1.018zm0 3.055c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0-2.031c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0 6.093c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm0-2.031c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.673v-1.017zm-16-6.104c2.119.311 4.332 1.004 6 1.626v1.064c-1.549-.649-3.914-1.361-6-1.672v-1.018zm0 5.09c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017zm0-2.031c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.316-6-1.626v1.017zm0 6.093c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017zm0-2.031c2.086.312 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017z"/></svg>
                  <span>Homework</span>
                </button>}
                
              </div>*/}
              <button ref={emojiPickerButtonRef} onClick={() => setShowPicker(!showPicker)} className={`post-attachment ${showPicker ? "post-attachment-active" : ""}`} title="Add an emoji">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
              </button>
              
              <label htmlFor="imageInput" className="post-attachment" title="Add an image">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/></svg>
              </label>
              
              <input onChange={handleImageInput} style={{display: "none"}} type="file" id="imageInput" name="imageInput" accept=".jpeg, .jpg, .png, .gif, .bmp, .webp, .heif"></input>

              <label htmlFor="documentInput" className="post-attachment" title="Add an attachment">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.586 10.461l-10.05 10.075c-1.95 1.949-5.122 1.949-7.071 0s-1.95-5.122 0-7.072l10.628-10.585c1.17-1.17 3.073-1.17 4.243 0 1.169 1.17 1.17 3.072 0 4.242l-8.507 8.464c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7.093-7.05-1.415-1.414-7.093 7.049c-1.172 1.172-1.171 3.073 0 4.244s3.071 1.171 4.242 0l8.507-8.464c.977-.977 1.464-2.256 1.464-3.536 0-2.769-2.246-4.999-5-4.999-1.28 0-2.559.488-3.536 1.465l-10.627 10.583c-1.366 1.368-2.05 3.159-2.05 4.951 0 3.863 3.13 7 7 7 1.792 0 3.583-.684 4.95-2.05l10.05-10.075-1.414-1.414z"/></svg>
              </label>
              <input ref={fileInputRef} style={{display: "none"}} onChange={handleFileInput} type="file" id="documentInput" name="documentInput" accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .odt"></input>
              


          </div>
          
          <div className="post-buttons">
              <button className="post-button my-post-button pink-button" onClick={postClick}>Post</button>
          </div>
          
          
      
        </div>
      </div>
      
    </>
    

  );
}

export default MyPost;
