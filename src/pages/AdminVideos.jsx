import React, { useEffect, useState, useRef, useContext } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import VideoBlock from '../components/Admin/VideoBlock';
import NotFoundBlock from '../components/Admin/NotFoundBlock';
import { LoginContext } from '../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/Tools/SearchBar';
import DropDown from '../components/Tools/DropDown';
import { useXHR } from "../components/Contexts/UseXHR";
import UploadVideosWindow from '../components/Window/UploadVideosWindow';
import VideoBlockSkeleton from '../components/Skeletons/VideoBlockSkeleton';


function AdminVideos() {
  const { sendRequest } = useXHR();
  
  const navigate = useNavigate();
  const { logData, setLogData } = useContext(LoginContext);
  
  useEffect(()=>{
    if(!logData.admin){
      navigate('/404');
    }
  },[]);

  const [videos, setVideos] = useState([]);

  const [uploadVideosWindow, setUploadVideosWindow] = useState(false);

  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const [sortVideo, setSortVideo] = useState("release-desc");

  const [loadedStatus, setLoadedStatus] = useState(false);
  const containerRef = useRef();
  const sentinelRef = useRef();
  const inquiriesLoadingRef = useRef(false);
  const inquiriesTimeout = useRef();
  const inquiriesCountRef = useRef(0);
  const timeOutRef = useRef();

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

    const filter = useRef({
        sort: sortVideo,
        searchBar: ""
      });
    
      function resetVideos() {
        inquiriesCountRef.current = 0;
        inquiriesLoadingRef.current = true;
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

  function getVideos(){
    sendRequest(
      ()=>{
        inquiriesLoadingRef.current = true;
      },
      "/back/get_videos.php",
      {
        limit: inquiriesCountRef.current + 10,
        search: filter.current.searchBar,
        sort_section: filter.current.sort
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
        { uploadVideosWindow &&
            <UploadVideosWindow refetch={getVideos} onClose={()=>{setUploadVideosWindow(false)} } />
        }         
        <Sidebar page={'admin-videos'}/>
        <div className="inner-content-with-header">
            <Header />
            <div className='admin-container videos-admin-container' ref={containerRef}>
              <div className='accounts-container-header'>
                <h3 className="accounts-header">Videos</h3>
                <div className='filters-container'>
                    <SearchBar onChange={onInputChange}/>
                    <DropDown
                        options={[
                            {displayName: "Release (Newest)", value: "release-desc"},
                            {displayName: "Release (Oldest)", value: "release-asc"},
                            // {displayName: "Added (Latest)", value: "id-desc"},
                            // {displayName: "Added (Earliest)", value: "id-asc"},
                            {displayName: "Title (A - Z)", value: "name-asc"},
                            {displayName: "Title (Z - A)", value: "name-desc"}
                            
                            

                        ]}
                        value={sortVideo}
                        onChange={setSortVideo} 
                        sections={[]}
                        menuId={`video-sort-filter`}
                  />
                        {/*<DropDown
                            options={
                                [
                                    {
                                      value: "all",
                                      displayName: "Duration"
                                    },
                                    {
                                      value: "test1",
                                      displayName: "< 5 mins"
                                    },
                                    {
                                        value: "test2",
                                        displayName: "5 - 10 mins"
                                    },
                                    {
                                        value: "test3",
                                        displayName: "10 - 20 mins"
                                    },
                                    {
                                        value: "test4",
                                        displayName: "20 - 60 mins"
                                    },
                                    {
                                        value: "test5",
                                        displayName: "> 60 mins"
                                    },
                                ]
                            }
                            value={durationFilter} // Controlled value
                            onChange={setDurationFilter} // Handler to update the state
                            sections={[]}
                            menuId={'video-duration-filter'}
                        />
                        <DropDown
                            options={
                                [
                                    {
                                      value: "all",
                                      displayName: "Upload Date"
                                    },
                                    {
                                      value: "test2",
                                      displayName: "This month"
                                    },
                                    {
                                        value: "test3",
                                        displayName: "Last 3 months"
                                    },
                                    {
                                        value: "test4",
                                        displayName: "This year"
                                    },
                                    {
                                        value: "test5",
                                        displayName: "Last 2 years"
                                    },
                                    
                                ]
                            }
                            value={dateFilter} // Controlled value
                            onChange={setDateFilter} // Handler to update the state
                            sections={[]}
                            menuId={'video-date-filter'}
                        />*/}
                    <button  className='create-account-btn' onClick={()=>{setUploadVideosWindow(true)}}>  
                      <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"/></svg>
                      <span>Upload videos</span>
                    </button>
                </div>
                {videos.map((applicant, i)=>
                  <VideoBlock refetch={getVideos} key={i} {...applicant}/>
                )}
                {
                    (videos.length === 0 && loadedStatus) &&
                    <NotFoundBlock />
                }
                <div ref={sentinelRef} style={{display: loadedStatus?"none":"block"}}>
                  <VideoBlockSkeleton />
                  <VideoBlockSkeleton />
                  <VideoBlockSkeleton />
                </div>
              </div>
        </div>
        </div>
        
      </div>
    );




  }
  
export default AdminVideos;
