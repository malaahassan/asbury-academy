import React, { useEffect, useState, useRef } from 'react';
import VideoHistoryTabSkeleton from '../components/Skeletons/VideoHistoryTabSkeleton';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import VideoTab from '../components/Videos/VideoTabCard';
import { useXHR } from "../components/Contexts/UseXHR";
import NotFoundBlock from '../components/Admin/NotFoundBlock';

function VideosHistory() {
    const { sendRequest } = useXHR();
    
    const [videos, setVideos] = useState([]);

    const [loadedStatus, setLoadedStatus] = useState(false);


    const inquiriesLoadingRef = useRef(false);
    const inquiriesTimeout = useRef();
    const inquiriesCountRef = useRef(0);

    const containerRef = useRef();
    const sentinelRef = useRef();

    useEffect(() => {
        // This code runs after the component mounts
        const handleScroll = () => {
          if (!containerRef.current || !sentinelRef.current) return;
    
          const container = containerRef.current;
          const skeleton = sentinelRef.current;
    
          const containerBottom = container.scrollTop + container.clientHeight;
          const skeletonTop = skeleton.offsetTop;
    
          const offset = 50; // Adjust how early you want to trigger
    
          if (containerBottom >= skeletonTop - offset && !inquiriesLoadingRef.current) {
            getVideos();
          }
        };
    
    
            const container = containerRef.current;
            if (container) {
              container.addEventListener("scroll", handleScroll);
            }
    
            // Trigger initial check slightly after mount
            const initialTriggerTimeout = setTimeout(handleScroll, 500);
    
            // Cleanup on unmount
            return () => {
              if (container) {
                container.removeEventListener("scroll", handleScroll);
              }
              clearTimeout(initialTriggerTimeout);
            };
        
        }, []);


        function getVideos(){
            sendRequest(
              ()=>{
                inquiriesLoadingRef.current = true;
              },
              "/back/get_my_video_history.php",
              {
                limit: inquiriesCountRef.current + 10,
                history: "full"
              },
              inquiriesTimeout,
              (response) => {
                setVideos(response[1]);
                  
                inquiriesCountRef.current = response[1].length;
                /*if(response[0] <= 0){
                  navigate('/404');
                }*/
                if(response[1].length == response[0]){
                  inquiriesLoadingRef.current = true;
                  setLoadedStatus(true);
                }
              },
              () => {
                inquiriesLoadingRef.current = false;
              },
              {},
              () => {
                inquiriesLoadingRef.current = true;
              }
              
            );
          }

    return (
        <div className="inner-content">
            <Sidebar page='videos'/>
            <div className="inner-content-with-header">
                
                <Header />
                <div className="video-history-container" ref={containerRef}>
                    <div className="page-go-back-container">
                        <Link to="/videos" className="page-go-back">
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"></path></svg>
                        </Link>
                        <h3 className="page-go-back-header">Watch history</h3>
                    </div>
                    <div className="watch-history-container">

                    {videos.map((video, index) => {
                        const showHeader =
                        index === 0 || video.time_title !== videos[index - 1].time_title;

                        return (
                        <React.Fragment key={video.watch_id}>
                            {showHeader && <h3 className="video-history-header">{video.time_title}</h3>}
                            <VideoTab 
                                key={video.watch_id}
                                {...video}
                                in_history={true}
                            />
                        </React.Fragment>
                        );
                    })}
                    
                    {
                        (videos.length === 0 && loadedStatus) &&
                        <NotFoundBlock />
                    }
                    <div ref={sentinelRef} style={{display: loadedStatus?"none":"flex", flexDirection: "column", gap: 20}}>
                        <div className="video-history-header">
                            <div className="skeleton-line" style={{ width: 100 }} />
                        </div>
                        
                        <VideoHistoryTabSkeleton />
                        <VideoHistoryTabSkeleton />
                        <VideoHistoryTabSkeleton />
                    </div>
                    </div>
                </div>
                

            </div>
        </div>
    );
  }
  
export default VideosHistory;