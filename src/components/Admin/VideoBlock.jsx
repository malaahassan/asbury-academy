import React, { useState, useEffect, useRef } from 'react'
import AdditionalInfoBlock from './AdditionalInfoBlock';
import ExpandableInfoBlock from './ExpandableInfoBlock';
import VideoHistoryContainer from '../Videos/VideoHistoryContainer.jsx';
import SureWindow from '../Window/SureWindow';
import EditVideoInfoWindow from '../Window/EditVideoInfoWindow';

import { useXHR } from "../Contexts/UseXHR";

const VideoBlock = ({
  id,
  name,
  description,
  description_exists,
  views,
  time,
  duration,
  thumbnail,
  user_name,
  refetch,
  url,
  extension
}) => {
  const { sendRequest } = useXHR();
  
  const [expanded, setExpanded] = useState(false);

  const [showCharts, setShowCharts] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  const [deleteVideoDisplayed, setDeleteVideoDisplayed] = useState(false);
  const [editVideoWindow, setEditVideoWindow] = useState(false);

  const [openVideosSuperExpander, setOpenVideosSuperExpander] = useState(false);

  const deleteTimeout = useRef();
  const expandTimeout = useRef();
  const videosSuperExpanderTimeout = useRef();

  useEffect(() => {
    clearTimeout(videosSuperExpanderTimeout.current);
  
    videosSuperExpanderTimeout.current = setTimeout(() => {
      setShowCharts(openVideosSuperExpander);
    }, 2000);
  
    return () => {
      clearTimeout(videosSuperExpanderTimeout.current);
    };
  }, [openVideosSuperExpander]);

  function handleExpandClick(e){
    if(expanded){
      setOpenVideosSuperExpander(false);
      clearTimeout(expandTimeout.current);
      expandTimeout.current = setTimeout(function(){
        setReadyToRender(false);
        e.target.style.pointerEvents = "auto";
      }, 1000);
      setExpanded(false);
      e.target.style.pointerEvents = "none";
    } else {
      clearTimeout(expandTimeout.current);
      expandTimeout.current = setTimeout(function(){
        setExpanded(true);
        e.target.style.pointerEvents = "auto";
      }, 100);
      setReadyToRender(true);
      e.target.style.pointerEvents = "none";
    }
    
  }

  function handleDeleteClick(e){
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = "0.5";
    sendRequest(
      ()=>{
        
      },
      "/back/delete_video.php",
      {
        id: id
      },
      deleteTimeout,
      () => {
        refetch();
        setDeleteVideoDisplayed(false);
      }
      
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}.${extension}`); // Set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={expanded ? "account-block applicant-block applicant-block-expanded" : "account-block applicant-block"}>
      <SureWindow display={deleteVideoDisplayed} message={`Are you sure you want to delete ${name} with all of its watch history?`} button="Delete" onYes={handleDeleteClick} onNo={()=>setDeleteVideoDisplayed(false)}/>
      { editVideoWindow &&
            <EditVideoInfoWindow refetch={refetch} id={id} title={name} description={description_exists ? description : ""} onClose={()=>{setEditVideoWindow(false)} } />
      }
      <div className="account-header">
        <div className="account-info">
          <div className="admission-headers-container" style={{alignItems: "flex-start"}}>
            <div className="video-tab-img-container">
                <img
                    className="video-tab-img"
                    src={thumbnail}
                />
                <div className="video-tab-play-icon-container">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" />
                    </g>
                    </svg>
                </div>
                <span className="video-tab-duration-box">{duration}</span>
            </div>


            <div className="admission-name-container">
              <div title={name} className='applicant-name-container' style={{userSelect:'none'}} onClick={handleExpandClick}>
                <h1 className="admission-header-name" style={{pointerEvents:'none', fontSize: 20}}>
                    {name} 
                </h1> 
                <svg className={expanded ? 'settings-arrow main-settings-arrow' : 'settings-arrow main-settings-arrow'} fill='currentColor' height='20' width='20' xmlns='http://www.w3.org/2000/svg'>
                  <path d='m7.942 15.442-.884-.884L11.616 10 7.058 5.442l.884-.884 5 5a.624.624 0 0 1 0 .884l-5 5Z'></path>
                </svg>   
              </div>
              <div className="video-tab-description">
                {description}
              </div>
              <div className="video-tab-user-credit">
                <span>{views.text} view{views.number != 1 && "s"}</span>
                <span className="video-tab-user-credit-bullet"></span>
                <span>{time}</span>
              </div>


            </div>
          </div>
          
        </div>
        <div className='accounts-btn-wrapper'>
            <button className="account-edit-button" onClick={()=>setDeleteVideoDisplayed(true)}>
              <svg className='edit-svg' clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
              <span className="account-edit-text">Delete</span>
            </button>

            
            <button className="account-edit-button" onClick={()=> setEditVideoWindow(true)}>
              <svg className='edit-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z' fillRule='nonzero' />
              </svg>
              <span className="account-edit-text">Edit</span>
            </button>

            <button className="account-edit-button" onClick={handleDownload}>
              <svg
                className="edit-svg"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12 5c3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-13c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78zm0-2c-4.006 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408-.212-3.951-3.473-7.092-7.479-7.092zm-4 10h3v-4h2v4h3l-4 4-4-4z" />
              </svg>
              <span className="account-edit-text">Download</span>
            </button>
          </div>
      </div>
      {readyToRender &&
      <ExpandableInfoBlock expanded={expanded}>
        <div className="hr" style={{ margin: "20px 0px", width: "100%" }} />
        <div className="account-full-info-container">
        <div className='account-full-info-container' style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="account-block-inside-header">Information</h3>
            <div className='account-full-info'>
            <div className="info-section" style={{width: "100%"}}>
                <div className="info-block">
                  <h3>Full name</h3>
                  <h2>{name}</h2>
                </div>
            </div>
            <div className="info-section" style={{width: "100%"}}>
                <div className="info-block">
                  <h3>Full description</h3>
                  <h2>{description}</h2>
                </div>
            </div>
            <div className="info-section">
                <div className="info-block">
                  <h3>Author</h3>
                  <h2>{user_name}</h2>
                </div>
            </div>
            
            {/* <div className="info-section">
                <div className="info-block">
                  <h3>Views</h3>
                  <h2>{views} views</h2>
                </div>
            </div>
            <div className="info-section">
                <div className="info-block">
                  <h3>Duration</h3>
                  <h2>{duration}</h2>
                </div>
            </div>
            
            <div className="info-section">
                <div className="info-block">
                    <h3>Uploaded</h3>
                    <h2>{time}</h2>
                </div>
            </div> */}
            
              
            </div>
          </div>
          <h3 className="account-block-inside-header">Views</h3>
          <div className="account-test-info-container">
            <AdditionalInfoBlock title='Watch History' setOpen={setOpenVideosSuperExpander}>
                      <div className="super-expanded-container">
                        <div className="account-test-history-container">
                                <VideoHistoryContainer ready={showCharts} video={id}/>
                        </div>
                      </div>
            </AdditionalInfoBlock>
          </div>
        
        </div>
      </ExpandableInfoBlock>
      }
    </div>
  )
}

export default VideoBlock;
