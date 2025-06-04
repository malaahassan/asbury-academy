import React, { useEffect, useState, useRef, useContext } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import GroupBlock from '../components/Admin/GroupBlock';
import NotFoundBlock from '../components/Admin/NotFoundBlock';
import { LoginContext } from '../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/Tools/SearchBar';
import DropDown from '../components/Tools/DropDown';
import CreateGroupWindow from '../components/Window/CreateGroupWindow';
import GroupBlockSkeleton from '../components/Skeletons/GroupBlockSkeleton';
import { useXHR } from "../components/Contexts/UseXHR";


function AdminGroups() {
  const { sendRequest } = useXHR();
  const navigate = useNavigate();
  const { logData, setLogData } = useContext(LoginContext);
  const [groups, setGroups] = useState([]);
  const [dropdownSubjects, setDropdownSubjects] = useState([]);
  const [dropdownTests, setDropdownTests] = useState([]);
  const [dropdownVideos, setDropdownVideos] = useState([]);
  const doDropdownsExistRef = useRef(false);

  const[ createGroupWindow, setCreateGroupWindow] = useState(false);


  const [loadedStatus, setLoadedStatus] = useState(false);
  const containerRef = useRef();
  const sentinelRef = useRef();
  const inquiriesLoadingRef = useRef(true);
  const inquiriesTimeout = useRef();
  const inquiriesCountRef = useRef(0);
  const timeOutRef = useRef();
  
  const filter = useRef({
    searchBar: ""
  });

  function resetGroups() {
    inquiriesCountRef.current = 0;
    inquiriesLoadingRef.current = true;
    setLoadedStatus(false);
    setGroups([]);
    getGroups();
  }

  useEffect(resetGroups,[]);


  function onInputChange(e){
    filter.current.searchBar = e.target.value;
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(()=>{
      resetGroups();
    }, 800);
  }

  useEffect(() => {
    if(!logData.admin){
      navigate('/404');
    }
    // This code runs after the component mounts
    const handleScroll = () => {
      if (!containerRef.current || !sentinelRef.current) return;

      const container = containerRef.current;
      const skeleton = sentinelRef.current;

      const containerBottom = container.scrollTop + container.clientHeight;
      const skeletonTop = skeleton.offsetTop;

      const offset = 50; // Adjust how early you want to trigger

      if (containerBottom >= skeletonTop - offset && !inquiriesLoadingRef.current) {
        getGroups();
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

  function getGroups(){
    

    sendRequest(
      ()=>{
        inquiriesLoadingRef.current = true;
      },
      "/back/groups.php",
      {
        limit: inquiriesCountRef.current + 10,
        search: filter.current.searchBar,
        dropdown: !doDropdownsExistRef.current
      },
      inquiriesTimeout,
      (response) => {
          setGroups(response[1]);
          if(!doDropdownsExistRef.current){
            setDropdownSubjects(response[2]);
            setDropdownTests(response[3]);
            setDropdownVideos(response[4]);
            doDropdownsExistRef.current = true;
          }
          
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
        { createGroupWindow &&
            <CreateGroupWindow refetch={getGroups} dropdown_subjects={dropdownSubjects} dropdown_tests={dropdownTests} dropdown_videos={dropdownVideos} onClose={()=>{setCreateGroupWindow(false)} } />
        }
        <Sidebar page={'admin-groups'}/>
        <div className="inner-content-with-header">
            <Header />
            <div className='admin-container' ref={containerRef}>
              <div className='accounts-container-header'>
                <h3 className="accounts-header">Groups</h3>
                <div className='filters-container'>
                    <SearchBar onChange={onInputChange}/>
                    
                    <button style={{pointerEvents: dropdownSubjects.length <= 0 ? "none" : "auto"}} className={`create-account-btn`} onClick={()=>{setCreateGroupWindow(true)}}>  
                      <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"/></svg>
                      <span>Create group</span>
                    </button>
                </div>
                {groups.map((group, i)=>
                  <GroupBlock refetch={getGroups} dropdown_subjects={dropdownSubjects} dropdown_tests={dropdownTests} dropdown_videos={dropdownVideos} key={group.id} {...group} />
                )}
                {
                    (groups.length === 0 && loadedStatus) &&
                    <NotFoundBlock />
                }
                <div ref={sentinelRef} style={{display: loadedStatus?"none":"block"}}>
                  <GroupBlockSkeleton />
                  <GroupBlockSkeleton />
                  <GroupBlockSkeleton />
                </div>
              </div>
        </div>
        </div>
        
      </div>
    );
  }
  
export default AdminGroups;