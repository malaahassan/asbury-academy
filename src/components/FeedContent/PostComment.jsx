import React, { useState, useRef, useContext } from 'react';
import Text from './Text';
import { LoginContext } from '../Contexts/LoginContext';
import UseOutsideClick from '../Window/UseOutsideClick';
import SureWindow from '../Window/SureWindow';
import { Link } from "react-router-dom";
import { useXHR } from "../Contexts/UseXHR";



function PostComment({comment_id, self_comment, text, poster, time, deleteComment, username, user_first_name, user_last_name, user_admin, user_developer, comment_poster, comment_cover}) {
    const { sendRequest } = useXHR();
  

  const { logData, setLogData } = useContext(LoginContext);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [deleteCommentDisplayed, setDeleteCommentDisplayed] = useState(false);
  const [deletedComment, setDeletedComment] = useState(false);

  const postOptionsMenuRef = useRef();
  const postOptionsButtonRef = useRef();

  const deleteCommentTimeout = useRef();

  UseOutsideClick(postOptionsMenuRef, postOptionsButtonRef, ()=>setIsOptionsOpen(false));

  function handleDeleteComment(e){
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = "0.5";
    sendRequest(
      ()=>{
        
      },
      "/back/delete_comment.php",
      {
        comment_id: comment_id,
      },
      deleteCommentTimeout,
      (response) => {
        deleteComment();
        setDeletedComment(true);
        setDeleteCommentDisplayed(false);
      }
      
    );
  }

  function handleDeleteCommentClick(){
    setIsOptionsOpen(false);
    setDeleteCommentDisplayed(true);
  }

  function handleDeleteCommentCancel(){
    clearTimeout(deleteCommentTimeout.current);
    setDeleteCommentDisplayed(false);
  }

  return (
    <div className="comment-header" style={{display: deletedComment? "none" : "flex" }}>
        <SureWindow display={deleteCommentDisplayed} message="Are you sure you want to delete this comment?" button="Delete" onYes={handleDeleteComment} onNo={handleDeleteCommentCancel}/>
        <div style={{display: (self_comment || logData.admin) ? "block" : "none"}}>
          <button ref={postOptionsButtonRef} className={isOptionsOpen ? "post-options-button-open post-options-button" : "post-options-button"} onClick={()=>setIsOptionsOpen(!isOptionsOpen)}>
            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/></svg>
          </button>
          <div ref={postOptionsMenuRef} className="post-options-menu" style={{display: isOptionsOpen ? "block": "none"}}>
              
                {/* <button className="post-options-menu-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.246 4.042c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v-2.841h-2v24h2v-9.073c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028s-1.621 1.429-3.754 1.429zm1.754 9.544c-.4.207-.959.414-1.593.414-.972 0-1.498-.363-2.371-.964-1.096-.755-2.596-1.79-5.113-1.79-1.979 0-3.71.679-4.923 1.339v-7.488c1.019-.902 2.865-1.949 4.909-1.949 1.333 0 1.894.439 2.741 1.103.966.756 2.288 1.792 4.596 1.792.627 0 1.215-.086 1.754-.223v7.766z"/></svg>
                  <span>Report</span>
                </button> */}
                <button className="post-options-menu-button" onClick={handleDeleteCommentClick}>
                  <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                  <span>Delete</span>
                </button>
                
              
              
              
          </div> 
        </div>
        <div className="post-header comment-profile-header-container">

            
            <Link to={`/community/profiles/${username}`} className="comment-profile-header-second-container">
              <img className="comment-header-poster" src={comment_poster} alt="User Profile Picture" />
              <div className="post-user-header">
                  <span className="comment-user-header-name">
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
                    </span>
                  <div className="comment-header-tiny-info">
                    <span>@{username}</span>
                    <span className="post-header-tiny-info-bullet"></span>
                    <span>{time}</span>
                  </div>
              </div>
            </Link>
            
            
        </div>
        <Text text={text} text_expanded={false} charLimit={200}/>
    </div>

  );
}

export default PostComment;
