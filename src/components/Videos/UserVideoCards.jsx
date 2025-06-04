import VideoTabCard from '../Videos/VideoTabCard.jsx';
import React, { useEffect, useState, useRef } from 'react';
import VideoTabSkeleton from '../Skeletons/VideoTabSkeleton';
import NotFoundBlock from '../Admin/NotFoundBlock';
import SearchBar from '../Tools/SearchBar';
import DropDown from '../Tools/DropDown';
import { useXHR } from "../Contexts/UseXHR";


function UserVideoCards({containerRef, slidesPerView}) {
    const { sendRequest } = useXHR();

    const [videos, setVideos] = useState([]);
    const [loadedStatus, setLoadedStatus] = useState(false);
    const [videosLoading, setVideosLoading] = useState(false);
    const [sortVideo, setSortVideo] = useState("release-desc");
    const videosLoadingRef = useRef(false);
    const sentinelRef = useRef();
    const videosTimeout = useRef();
    const videosCountRef = useRef(0);
    const timeOutRef = useRef();
    const filter = useRef({
        sort: sortVideo,
        searchBar: ""
      });

      function resetVideos() {
          videosCountRef.current = 0;
          videosLoadingRef.current = true;
          setLoadedStatus(false);
          setVideos([]);
          getVideos();
        }
      
        useEffect(() => {
          filter.current.sort = sortVideo;
          resetVideos();
        },[sortVideo]);
      
        function onInputChange(e){
          filter.current.searchBar = e.target.value;
          clearTimeout(timeOutRef.current);
          timeOutRef.current = setTimeout(()=>{
            resetVideos();
          }, 800);
        }

    useEffect(() => {
        // This code runs after the component mounts
        const handleScroll = () => {
          if (!containerRef.current || !sentinelRef.current) return;
    
          const container = containerRef.current;
          const skeleton = sentinelRef.current;
    
          const containerBottom = container.scrollTop + container.clientHeight;
          const skeletonTop = skeleton.offsetTop;
    
          const offset = 50; // Adjust how early you want to trigger
    
          if (containerBottom >= skeletonTop - offset && !videosLoadingRef.current) {
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
            videosLoadingRef.current = true;
            setVideosLoading(true);
          },
          "/back/get_videos.php",
          {
            limit: videosCountRef.current + 10,
            sort_section: filter.current.sort,
            search: filter.current.searchBar
          },
          videosTimeout,
          (response) => {
              setVideos(response[1]);
              
              videosCountRef.current = response[1].length;
              /*if(response[0] <= 0){
                navigate('/404');
              }*/
              if(response[1].length == response[0]){
                videosLoadingRef.current = true;
                setLoadedStatus(true);
              }
          },
          () => {
              videosLoadingRef.current = false;
              setVideosLoading(false);
          },
          {},
          () => {
            videosLoadingRef.current = true;
          }
          
        );

      }

      function getRequiredSlides(totalSlides, slidesPerView) {
        if (slidesPerView <= 0) return 0;
      
        const remainder = totalSlides % slidesPerView;
        const missing = remainder === 0 ? 0 : slidesPerView - remainder;
        return slidesPerView + missing;
      }
  
    return (
        <div className="videos-page-second-container">
            <div className='filters-container' style={{marginTop: 30}}>
              <SearchBar onChange={onInputChange}/>
              <DropDown
                    options={[
                        {displayName: "Release (Newest)", value: "release-desc"},
                        {displayName: "Release (Oldest)", value: "release-asc"},
                        // {displayName: "Added (Latest)", value: "id-desc"},
                        // {displayName: "Added (Earliest)", value: "id-asc"},
                        {displayName: "Name (A - Z)", value: "name-asc"},
                        {displayName: "Name (Z - A)", value: "name-desc"}
                        
                        

                    ]}
                    value={sortVideo}
                    onChange={setSortVideo} 
                    sections={[]}
                    menuId={`video-sort-filter`}
              />
            </div>
            <div className="videos-container">
            {
                videos.map((video, i)=>
                    <VideoTabCard
                        {...video}
                        key={video.id}  
                    />
                )
            }
            {
                    (videos.length === 0 && loadedStatus) &&
                    <NotFoundBlock />
            }
            <div ref={sentinelRef} style={{display: loadedStatus?"none":"flex"}}>
              <VideoTabSkeleton />
            </div>
            
            {Array.from({ length: getRequiredSlides(videos.length, slidesPerView) - 1 }).map((_, index) => (
              <div key={index} style={{display: loadedStatus?"none":"flex"}} >
                <VideoTabSkeleton />
              </div>
            ))}
            
        </div>
        </div>
        
              
             
    );
  }
  
export default UserVideoCards;