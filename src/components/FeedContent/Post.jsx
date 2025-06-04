import React, { useState, useRef, useEffect, useContext } from 'react';
import PostComment from './PostComment';
import Attachment from './Attachment';
import Image from './Image';
import Text from './Text';
import CommentSkeleton from '../Skeletons/CommentSkeleton';
import Errors from '../Window/Errors';
import UseOutsideClick from '../Window/UseOutsideClick';
import { LoginContext } from '../Contexts/LoginContext';
import SureWindow from '../Window/SureWindow';
import PostInfoWindow from '../Window/PostInfoWindow';
import EmojiPicker from "emoji-picker-react";
import { Link } from "react-router-dom";
import { useXHR } from "../Contexts/UseXHR";



function Post({pinned, username, user_first_name, user_last_name, user_admin, user_developer, user_group, poster, cover, text, commentsNumber, time, activity, likes, liked_by_people, saves, post_id, liked, saved, image, file, self_post, comments_open, text_expanded, date, allow_pin}) {
  const { sendRequest } = useXHR();

  const { logData, setLogData } = useContext(LoginContext);
  
  
  const postTypeRef = useRef("post");
  useEffect(() => {
    if (image) {
      postTypeRef.current = 'image';
    } else if (file) {
      postTypeRef.current ='file document';
    }
  }, [image, file]);

  useEffect(()=> {
    if(comments_open){
      clickComment();
    }
    
  }, [])
  

  const [deletePostDisplayed, setDeletePostDisplayed] = useState(false);
  const [pinPostDisplayed, setPinPostDisplayed] = useState(false);
  const [postInfoDisplayed, setPostInfoDisplayed] = useState(false);

  const [deletedPost, setDeletedPost] = useState(false);
  const [isPinned, setIsPinned] = useState(pinned);

  const [error, setError] = useState({error: null, message: null});
  
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const [lastCommentsNumber, setLastCommentsNumber] = useState(commentsNumber);
  const [lastLikesNumber, setLastLikesNumber] = useState(likes);
  const [lastSavesNumber, setLastSavesNumber] = useState(saves);

  const [likeClicked, setLikeClicked] = useState(liked);
  const [saveClicked, setSaveClicked] = useState(saved);
  const [likeLoading, setLikeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [liked_by_all_people, set_liked_by_all_people] = useState(likeClicked ? {number: lastLikesNumber, people: ["You", ...liked_by_people]} : {number: lastLikesNumber, people: [...liked_by_people]});
  
  useEffect(() => {
    set_liked_by_all_people(likeClicked ? {number: lastLikesNumber, people: ["You", ...liked_by_people]} : {number: lastLikesNumber, people: [...liked_by_people]});
  }, [likeClicked]);
  
  
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState([]);

  //EMOJI & Text
  const emojiPickerContainerRef = useRef();
  const emojiPickerButtonRef = useRef();

  const [commentValue, setCommentValue] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const handleEmojiClick = (emojiData) => {
    setCommentValue((prev) => prev + emojiData.emoji);
    //setShowPicker(false); // Close picker after selection
  };

  UseOutsideClick(emojiPickerContainerRef, emojiPickerButtonRef, ()=>setShowPicker(false));


  const [partiallyLoadingStatus, setPartiallyLoadingStatus] = useState(false);
  const [fullyLoadedStatus, setFullyLoadedStatus] = useState(false);
  const [commentLoadingStatus, setCommentLoadingStatus] = useState(false);
  const textareaRef = useRef();
  const commentsCountRef = useRef(0);
  const commentsLoadingRef = useRef(false);
  const commentsContainerRef = useRef();
  
  const commentTimeout = useRef();
  const commentsTimeout = useRef();
  const likeTimeout = useRef();
  const saveTimeout = useRef();
  const deletePostTimeout = useRef();
  const pinPostTimeout = useRef();

  const postOptionsMenuRef = useRef();
  const postOptionsButtonRef = useRef();
  

  UseOutsideClick(postOptionsMenuRef, postOptionsButtonRef, ()=>setIsOptionsOpen(false));

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [commentValue]);

  function postComment(){
    if(commentValue.length > 0 && commentValue != "" && (/[^\n]/.test(commentValue))){
      sendRequest(
        ()=>{
          setCommentLoadingStatus(true);
        },
        "/back/comment.php",
        {
          text: commentValue.replace(/^\n+|\n+$/g, ''),
          post_id: post_id
        },
        commentTimeout,
        (response) => {
            getComments();
            /*setComments((c) => [{
              user_id: 1,
              name: "Mohamed",
              poster: "https://via.placeholder.com/35",
              text: commentValue.replace(/^\n+|\n+$/g, ''),
              time: "just now"
            }, ...c]);
            setLastCommentsNumber(c => c + 1);*/
            setCommentValue("");
        },
        () => {
          setCommentLoadingStatus(false);
        }
        
      );
      
      
    }
    
  }
  

  function getComments(){
    commentsLoadingRef.current = true;

    sendRequest(
      ()=>{
        setPartiallyLoadingStatus(true);
      },
      "/back/comments.php",
      {
        post_id: post_id,
        limit: commentsCountRef.current + 3
      },
      commentsTimeout,
      (response) => {
        setComments(response[1]);
          setLastCommentsNumber(response[0]);
          commentsCountRef.current = response[1].length;
          if(response[1].length == response[0]){
            commentsLoadingRef.current = true;
            setFullyLoadedStatus(true);
          }
      },
      () => {
        commentsLoadingRef.current = false;
        setPartiallyLoadingStatus(false);
      }
      
    );

  }


  function clickComment(){
    clearTimeout(commentsTimeout.current);
    if(!commentsVisible){
      setCommentsVisible(!commentsVisible);
      getComments();
    } else {
      commentsLoadingRef.current = false;
      commentsCountRef.current = 0;
      setFullyLoadedStatus(false);
      setComments([]);
      setCommentsVisible(!commentsVisible);
    }
    
  }

  function firstClickLike(){
    clearTimeout(likeTimeout.current);
    likeClicked ? setLastLikesNumber((l) => parseInt(l) - 1) : setLastLikesNumber((l) => parseInt(l) + 1);
    clickLike();
  }
  

  function clickLike(){

    sendRequest(
      ()=>{
        setLikeLoading(true);
      },
      "/back/like.php",
      {
        post_id: post_id,
        like: !likeClicked,
      },
      likeTimeout,
      (response) => {
          setLastLikesNumber(response["likes"]);
      },
      () => {
          setLikeLoading(false);
      }
      
    );
    
    setLikeClicked(!likeClicked);
  }

  function firstClickSave(){
    clearTimeout(saveTimeout.current);
    saveClicked ? setLastSavesNumber((s) => parseInt(s) - 1) : setLastSavesNumber((s) => parseInt(s) + 1);
    clickSave();
  }

  function clickSave(){

    sendRequest(
      ()=>{
        setSaveLoading(true);
      },
      "/back/save.php",
      {
        post_id: post_id,
        save: !saveClicked,
      },
      saveTimeout,
      (response) => {
          setLastSavesNumber(response["saves"]);
      },
      () => {
          setSaveLoading(false);

      }
      
    );

    setSaveClicked(!saveClicked);
  }

  function handleDeletePostClick(){
    setIsOptionsOpen(false);
    setDeletePostDisplayed(true);
  }

  function handlePinPostClick(){
    setIsOptionsOpen(false);
    setPinPostDisplayed(true);
  }

  function handleDeletePost(e){
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = "0.5";

    sendRequest(
      ()=>{
        
      },
      "/back/delete_post.php",
      {
        post_id: post_id,
      },
      deletePostTimeout,
      (response) => {
          setDeletedPost(true);
          setDeletePostDisplayed(false);
      }
      
    );
    
  }
  

  function handleDeletePostCancel(){
    clearTimeout(deletePostTimeout.current);
    setDeletePostDisplayed(false);
  }

  function handlePinPost(e){
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = "0.5";

    sendRequest(
      ()=>{
        
      },
      "/back/pin_post.php",
      {
        post_id: post_id,
      },
      pinPostTimeout,
      (response) => {
        setIsPinned(!isPinned);
        setPinPostDisplayed(false);
      }
      
    );
  }
  

  function handlePinPostCancel(){
    clearTimeout(pinPostTimeout.current);
    setPinPostDisplayed(false);
  }


  function handleShareClick(){
      if (navigator.share) {
        try {
            navigator.share({
                title: `${user_first_name}'s ${postTypeRef.current}`,
                text: `Check out this ${postTypeRef.current} by ${user_first_name} ${user_last_name}`,
                url: `/posts/${post_id}`
            });
            console.log('Successfully shared');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Share is not supported in your browser.');
    }
  }

  function handleCommentDelete(){
    setLastCommentsNumber(c => parseInt(c) - 1);
  }
  
  
  return (
      
      <div className="post" style={{display: deletedPost? "none" : "block" }}>
        {
          postInfoDisplayed &&
          <PostInfoWindow onClose={()=> setPostInfoDisplayed(false) } firstName={user_first_name} lastName={user_last_name} postedAt={date} post_id={post_id} />

        }
        <SureWindow display={deletePostDisplayed} message="Are you sure you want to delete this post?" button="Delete" onYes={handleDeletePost} onNo={handleDeletePostCancel}/>
        <SureWindow display={pinPostDisplayed} message={`Are you sure you want to ${isPinned ? "unpin" : "pin"} this post?`} button={isPinned ? "Unpin" : "Pin"} onYes={handlePinPost} onNo={handlePinPostCancel}/>

        <Errors error={error} onClose={()=> setError({error: null, message: null})}/>

        <button ref={postOptionsButtonRef} className={isOptionsOpen ? "post-options-button-open post-options-button" : "post-options-button"} onClick={()=>setIsOptionsOpen(!isOptionsOpen)}>
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/></svg>
        </button>
        <div ref={postOptionsMenuRef} className="post-options-menu" style={{display: isOptionsOpen ? "block": "none"}}>
            <button className="post-options-menu-button" onClick={()=>setPostInfoDisplayed(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/></svg>
              <span>Info.</span>
            </button>
            {/* <button className="post-options-menu-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.246 4.042c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v-2.841h-2v24h2v-9.073c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028s-1.621 1.429-3.754 1.429zm1.754 9.544c-.4.207-.959.414-1.593.414-.972 0-1.498-.363-2.371-.964-1.096-.755-2.596-1.79-5.113-1.79-1.979 0-3.71.679-4.923 1.339v-7.488c1.019-.902 2.865-1.949 4.909-1.949 1.333 0 1.894.439 2.741 1.103.966.756 2.288 1.792 4.596 1.792.627 0 1.215-.086 1.754-.223v7.766z"/></svg>
              <span>Report</span>
            </button> */}
            
            {/* <button className="post-options-menu-button" onClick={handleShareClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z"/></svg>
              <span>Share</span>
            </button> */}


            {/*<button className="post-options-menu-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028z"/></svg>
              <span>Report</span>
            </button>*/}
            
            {/*<button className="post-options-menu-button">
            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z" fillRule="nonzero"/></svg>
              <span>Edit</span>
            </button>*/}

              {(logData.admin && allow_pin) && 
              <button className="post-options-menu-button" onClick={handlePinPostClick}>
                <svg style={{transform: "rotate(45deg)"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 17h2v5l-2 2v-7zm7-2h-12c0-3.128.091-4.744 1.874-7.276.551-.783.915-1.3.915-2.373 0-2.372-1.789-1.695-1.789-5.351h10c0 3.616-1.789 3.005-1.789 5.35 0 1.073.364 1.59.915 2.374 1.785 2.535 1.874 4.154 1.874 7.276zm-9.968-2h7.936c-.298-4.376-2.756-4.142-2.756-7.649-.001-1.605.521-2.351 1.271-3.351h-4.966c.75 1 1.272 1.745 1.272 3.35 0 3.487-2.46 3.29-2.757 7.65z"/></svg>
                {isPinned ? 
                  <span>Unpin post</span> :
                  <span>Pin post</span>
                }
              </button>
              }
              {(self_post || logData.admin) &&
                <button className="post-options-menu-button" onClick={handleDeletePostClick}>
                  <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                  <span>Delete</span>
                </button>
              }
              
            
            
        </div>
        <div className="post-header" style={{marginBottom: !text && "25px"}}>
            
            <Link to={`/community/profiles/${username}`} className="post-header-profile-block">
              <img className="post-header-poster" src={poster} alt="User Profile Picture"/>
              <div className="post-user-header">
                  <div className="post-user-header-name">
                    <span>{user_first_name} {user_last_name}</span>
                    
                    { user_admin && 
                      <span className="user-header-tag admin-tag" title="Administrator">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 19v3h-20v-3h20zm0-15c-1.5 0-2.662 1.685-1.598 3.194.535.759.406 1.216.045 1.749-.765 1.127-1.872 2.057-3.447 2.057-2.521 0-3.854-2.083-4.131-3.848-.096-.614-.15-1.074.436-1.644.402-.39.695-.904.695-1.508 0-1.104-.896-2-2-2s-2 .896-2 2c0 .604.293 1.118.695 1.508.586.57.531 1.03.436 1.644-.277 1.765-1.61 3.848-4.131 3.848-1.575 0-2.682-.93-3.447-2.058-.362-.532-.491-.989.045-1.748 1.064-1.509-.098-3.194-1.598-3.194-1.104 0-2 .896-2 2 0 .797.464 1.495 1.144 1.808.825.38.856 1.317.856 2.171v7.021h20v-7.021c0-.854.031-1.792.856-2.171.68-.313 1.144-1.011 1.144-1.808 0-1.104-.896-2-2-2z"></path></svg>
                      </span>
                    }
                    { user_developer && 
                      <span className="user-header-tag developer-tag" title="Developer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10.935v2.131l-10 4.934v-2.23l7.64-3.77-7.64-3.779v-2.221l10 4.935zm-24 0v2.131l10 4.934v-2.23l-7.64-3.77 7.64-3.779v-2.221l-10 4.935z"/></svg>
                      </span>
                    }
                    
                    {/*<span className="user-header-tag contributor-tag" title="Top Contributor">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"></path></svg>
                    </span>*/}
                  </div>
                  <div className="post-header-tiny-info">
                    <span>@{username}</span>
                    <span className="post-header-tiny-info-bullet"></span>
                    <span>{time}</span>
                  </div>
              </div>
            </Link>
            
        </div>
        <div className="post-pins-container">
          {isPinned &&
          <div className="pinned-post">
            <span className="pinned-post-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M11 17h2v5l-2 2v-7zm7-2h-12c0-3.128.091-4.744 1.874-7.276.551-.783.915-1.3.915-2.373 0-2.372-1.789-1.695-1.789-5.351h10c0 3.616-1.789 3.005-1.789 5.35 0 1.073.364 1.59.915 2.374 1.785 2.535 1.874 4.154 1.874 7.276zm-9.968-2h7.936c-.298-4.376-2.756-4.142-2.756-7.649-.001-1.605.521-2.351 1.271-3.351h-4.966c.75 1 1.272 1.745 1.272 3.35 0 3.487-2.46 3.29-2.757 7.65z"></path></svg>
            </span>
            <span className="pinned-post-text-container">Pinned Post</span>
          </div> 
          }
        </div>
        
        
        <Text text={text} expanded={text_expanded}/>
        <Image image={image} />
        <Attachment file={file} />
        <div className='post-liked-by'>

          
          {(liked_by_all_people.people.length === 1 && liked_by_all_people.number == 1) &&
            `Liked by ${liked_by_all_people.people[0]}.`
          }
          {(liked_by_all_people.people.length === 2 && liked_by_all_people.number == 2) &&
            `Liked by ${liked_by_all_people.people[0]} and ${liked_by_all_people.people[1]}.`
          }
          
          {(liked_by_all_people.people.length >= 2 && liked_by_all_people.number - 2 > 0) &&
            `Liked by ${liked_by_all_people.people[0]}, ${liked_by_all_people.people[1]}, and ${lastLikesNumber - 2} other${lastLikesNumber - 2 > 1 ? "s" : ""}.`
          }

        </div>
        
        
        

        

        {/* <div className="hr"></div> */}
        <div className="actions">
          <button className="reaction-button like-button" onClick={firstClickLike} style={{pointerEvents: likeLoading ? "none" : "auto"}}>
              {
                likeClicked ?
                <svg className="reaction-svg-clicked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
                :  
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>
              }
              {
                lastLikesNumber > 0 &&
                <span className="post-action-text">{lastLikesNumber}{/*<span className="post-action-inside-text">Like{lastLikesNumber != 1 && "s"}</span>*/}</span>
              }
          </button>
          <button className="reaction-button comment-button" onClick={clickComment}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 3.002c4.411 0 8 2.849 8 6.35 0 3.035-3.029 6.311-7.925 6.311-1.58 0-2.718-.317-3.718-.561-.966.593-1.256.813-3.006 1.373.415-1.518.362-2.182.331-3.184-.837-1.001-1.682-2.069-1.682-3.939 0-3.501 3.589-6.35 8-6.35zm0-2.002c-5.281 0-10 3.526-10 8.352 0 1.711.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.312 2.168-.391 5.252-1.258 6.649-2.115 1.181.289 2.312.421 3.382.421 5.903 0 9.925-4.038 9.925-8.313 0-4.852-4.751-8.352-10-8.352zm11.535 11.174c-.161.488-.361.961-.601 1.416 1.677 1.262 2.257 3.226.464 5.365-.021.745-.049 1.049.138 1.865-.892-.307-.979-.392-1.665-.813-2.127.519-4.265.696-6.089-.855-.562.159-1.145.278-1.74.364 1.513 1.877 4.298 2.897 7.577 2.1.914.561 2.933 1.127 4.352 1.385-.53-1.045-1.117-2.479-1.088-3.479 1.755-2.098 1.543-5.436-1.348-7.348zm-15.035-3.763c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071zm3.5 0c-.591 0-1.071.479-1.071 1.071s.48 1.071 1.071 1.071 1.071-.479 1.071-1.071-.48-1.071-1.071-1.071z"/></svg>              
            {
                lastCommentsNumber > 0 &&
                <span className="post-action-text">{lastCommentsNumber}{/*<span className="post-action-inside-text">Comment{lastCommentsNumber != 1 && "s"}</span>*/}</span>
            }
          </button>
          <button className="reaction-button save-button" onClick={firstClickSave} style={{pointerEvents: saveLoading ? "none" : "auto"}}>
              {
                saveClicked ?
                <svg className="reaction-svg-clicked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 24l-5-4.39-5 4.39v-20h10v20zm-12-22h8v-2h-10v20l2-1.756v-16.244z"/></svg>
                :
                <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 6v13.583l-3-2.634-3 2.634v-13.583h6zm2-2h-10v20l5-4.39 5 4.39v-20zm-12-2h8v-2h-10v20l2-1.756v-16.244z"></path></svg>
              }
              {
                lastSavesNumber > 0 &&
                <span className="post-action-text">{lastSavesNumber}{/*<span className="post-action-inside-text">Save{lastSavesNumber != 1 && "s"}</span>*/}</span> 
              }
          </button>
          <button className="reaction-button share-button" onClick={handleShareClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 9c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.239-5 5s2.238 5 5 5 5-2.239 5-5-2.238-5-5-5zm15 9c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.944 1.764l5.488 2.927c-.072.301-.121.611-.121.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-22c-2.209 0-4 1.791-4 4 0 .324.049.634.121.935l-5.488 2.927c.395.536.713 1.128.944 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4s-1.791-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/></svg>
            
          </button>
        </div>
        {
          <div style={{display: commentsVisible? "block":"none"}}>
            
            {/* <div className="hr"></div> */}
            <div className="comments-section" ref={commentsContainerRef}>
              <div className="comment-header my-comment-header" style={{pointerEvents: commentLoadingStatus? "none": "auto"}}>
                <textarea disabled={commentLoadingStatus?true : null} value={commentValue} ref={textareaRef} onKeyDown={ function(e){if(e.key === 'Enter' && !e.shiftKey){e.preventDefault(); postComment();}} } onChange={(e) => setCommentValue(e.target.value)} className="comment-text" type="text" name="commenttext" placeholder="Write a comment..." />
                <div ref={emojiPickerContainerRef} className="emoji-picker-container" style={{top: "unset", bottom: 50}}>
                  {showPicker && <EmojiPicker 
                        onEmojiClick={handleEmojiClick} 
                        emojiStyle="native" 
                        autoFocusSearch={false} 
                        suggestedEmojisMode="recent" 
                        previewConfig={{showPreview: false}} /> }
                </div>
                <div className="comment-send-container" style={{opacity: commentLoadingStatus? "0.5": "1"}}>
                  <div className='comment-send-left-container' style={{pointerEvents: commentLoadingStatus? "none": "auto"}}>
                    <button ref={emojiPickerButtonRef} onClick={() => setShowPicker(!showPicker)} className={`post-attachment ${showPicker ? "post-attachment-active" : ""}`} title="Add an emoji">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"></path></svg>
                    </button>
                    <div className="comment-send-loader" style={{display: commentLoadingStatus? "block": "none"}}></div>
                  </div>
                  
                  <button onClick={postComment} className="comment-send-button"><span>Comment</span><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m.172,3.708C-.216,2.646.076,1.47.917.713,1.756-.041,2.951-.211,3.965.282l18.09,8.444c.97.454,1.664,1.283,1.945,2.273H4.048L.229,3.835c-.021-.041-.04-.084-.057-.127Zm3.89,9.292L.309,20.175c-.021.04-.039.08-.054.122-.387,1.063-.092,2.237.749,2.993.521.467,1.179.708,1.841.708.409,0,.819-.092,1.201-.279l18.011-8.438c.973-.456,1.666-1.288,1.945-2.28H4.062Z"/></svg></button>
                </div>
              </div>
              {/* <div className="hr"></div> */}
              {
                comments.map((comment, index) => <PostComment key={comment.comment_id} {...comment} deleteComment={handleCommentDelete}/>)
              }
              <div style={{display: !partiallyLoadingStatus?"none":"block"}}>
                <CommentSkeleton />
                <CommentSkeleton />
              </div>
              
            </div>
            {(!fullyLoadedStatus && !partiallyLoadingStatus) && 
            <button onClick={() => !commentsLoadingRef.current && getComments()} className="load-more-comments">View more comments</button>
            }
            
          </div>
        }
        
        
        
        
      </div>
    
  );
}

export default Post;
