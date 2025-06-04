import VideoHistoryTable from './VideoHistoryTable.jsx';
import DropDown from '../Tools/DropDown';
import {useState, useRef, useEffect} from 'react';
import { useXHR } from "../Contexts/UseXHR";


function VideoHistoryContainer({user, video, control, ready, title}) {
    const { sendRequest } = useXHR();

    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    const [showAmount, setShowAmount] = useState("5");
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(true);
    const videosTimeout = useRef();
    
    useEffect(() => {
        getVideos();
      
    }, [page, ready]);

    useEffect(() => {
      setPage(1); 
      if(page != 1){
        setPage(1);  
      } else {
        if(!videosLoading){
          getVideos();
        }
      }
    }, [showAmount]);


    function getVideos(){
      if(ready){
      
        if(user){
          sendRequest(
            ()=>{
              setVideosLoading(true);
            },
            "/back/get_videos_history.php",
            {
              limit: showAmount,
              page: page,
              user: user
            },
            videosTimeout,
            (response) => {
              setVideos(response[0]);
              setPages(response[1]);
            },
            () => {
                setVideosLoading(false);
            }
            
          );
        } else if(video){
          sendRequest(
            ()=>{
              setVideosLoading(true);
            },
            "/back/get_videos_history.php",
            {
              limit: showAmount,
              page: page,
              video: video
            },
            videosTimeout,
            (response) => {
              setVideos(response[0]);
              setPages(response[1]);
            },
            () => {
                setVideosLoading(false);
            }
            
          );
        }
        
        

      } else {
        setVideosLoading(true);
      }
    }

    function handleNextPage(){
      if(page < pages){
        setPage(prevCount => prevCount + 1);
      }
      
    }

    function handlePrevPage(){
      if(page > 1){
        setPage(prevCount => prevCount - 1);
      }
    }


    return (
        <div className="test-history-container">
          <h3 className="dashboard-header">{title}</h3>
          <VideoHistoryTable videos={videos} loading={videosLoading} show_videos_number={parseInt(showAmount)} by_user={user}/>
          { (!videosLoading && videos.length <= 0) &&
            <div className="empty-table-container">
              Nothing to show here.
            </div>
          }
          <div className={`after-table-container${videosLoading || (!videosLoading && videos.length <= 0) ? " disabled-settings" : ""}`}>
          {control && <DropDown
              options={[
                {
                  value: "5",
                  displayName: "Show 5 results"
                },
                {
                  value: "10",
                  displayName: "Show 10 results"
                },
                {
                  value: "20",
                  displayName: "Show 20 results"
                },
                {
                  value: "40",
                  displayName: "Show 40 results"
                }
              ]}
              value={showAmount}
              onChange={setShowAmount} 
              sections={[]}
              menuId={`page-results-filter-${user || video}`}
          /> }
          <div className="after-table-buttons-container">
            <button className={`test-card-button white${page <= 1 ? " disabled-settings" : ""}`} onClick={handlePrevPage}>
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"
                  fillRule="nonzero"
                />
              </svg>
            </button>

            <div className="after-table-page-count">{page} of {pages}</div>
            <button className={`test-card-button white${page >= pages ? " disabled-settings" : ""}`} onClick={handleNextPage}>
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
          </div>
            

          </div>
        </div>      
    );
}

export default VideoHistoryContainer;