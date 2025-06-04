import React, { useEffect, useState, useRef, useContext } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import TestBlock from '../components/Admin/TestBlock';
import NotFoundBlock from '../components/Admin/NotFoundBlock';
import { LoginContext } from '../components/Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/Tools/SearchBar';
import DropDown from '../components/Tools/DropDown';
import TestBlockSkeleton from '../components/Skeletons/TestBlockSkeleton';
import { useXHR } from "../components/Contexts/UseXHR";
import CreateTestWindow from '../components/Window/CreateTestWindow';


function AdminTests() {
  const { sendRequest } = useXHR();
  const navigate = useNavigate();
  const { logData, setLogData } = useContext(LoginContext);
  
  const [tests, setTests] = useState([]);
  const [testFilter, setTestFilter] = useState("act");
  const [sortTest, setSortTest] = useState("release-desc");

  const [loadedStatus, setLoadedStatus] = useState(false);
  const [createTestWindow, setCreateTestWindow] = useState(false);
  const containerRef = useRef();
  const sentinelRef = useRef();
  const inquiriesLoadingRef = useRef(true);
  const inquiriesTimeout = useRef();
  const inquiriesCountRef = useRef(0);
  const timeOutRef = useRef();
  const filter = useRef({
    type: testFilter,
    sort: sortTest,
    searchBar: ""
  });

  function resetTests() {
    inquiriesCountRef.current = 0;
    inquiriesLoadingRef.current = true;
    setLoadedStatus(false);
    setTests([]);
    getTests();
  }

  useEffect(() => {
    filter.current.type = testFilter;
    filter.current.sort = sortTest;
    resetTests();
  },[testFilter, sortTest]);

  function onInputChange(e){
    filter.current.searchBar = e.target.value;
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(()=>{
      resetTests();
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
        getTests();
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

  function getTests(){
    
    sendRequest(
      ()=>{
        inquiriesLoadingRef.current = true;
      },
      "/back/get_tests.php",
      {
        limit: inquiriesCountRef.current + 10,
        type: filter.current.type,
        search: filter.current.searchBar,
        sort_section: filter.current.sort
      },
      inquiriesTimeout,
      (response) => {
        setTests(response[1]);
          
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
        { createTestWindow &&
            <CreateTestWindow refetch={getTests} onClose={()=>{setCreateTestWindow(false)} } />
        }     
        <Sidebar page={'admin-tests'}/>
        <div className="inner-content-with-header">
            <Header />
            <div className='admin-container' ref={containerRef}>
              <div className='accounts-container-header'>
                <h3 className="accounts-header">Tests and Workouts</h3>
                <div className='filters-container'>
                    <SearchBar onChange={onInputChange}/>
                    <DropDown
                        options={
                            [
                                {
                                    value: "act",
                                    displayName: "ACT Tests"
                                },
                                {
                                    value: "est",
                                    displayName: "EST Tests"
                                },
                                {
                                    value: "sat",
                                    displayName: "SAT Tests"
                                },
                                {
                                    value: "digitalsat",
                                    displayName: "Digital SAT Tests"
                                },
                                {
                                    value: "reading_workout",
                                    displayName: "Reading Workouts"
                                }
                                ,
                                {
                                    value: "writing_workout",
                                    displayName: "Writing Workouts"
                                }
                            ]
                        }
                        value={testFilter} // Controlled value
                        onChange={setTestFilter} // Handler to update the state
                        sections={[]}
                        menuId={'test-table-filter'}
                    />
                    <DropDown
                        options={[
                            {displayName: "Release (Newest)", value: "release-desc"},
                            {displayName: "Release (Oldest)", value: "release-asc"},
                            // {displayName: "Added (Latest)", value: "id-desc"},
                            // {displayName: "Added (Earliest)", value: "id-asc"},
                            {displayName: "Name (A - Z)", value: "name-asc"},
                            {displayName: "Name (Z - A)", value: "name-desc"}
                            
                            

                        ]}
                        value={sortTest}
                        onChange={setSortTest} 
                        sections={[]}
                        menuId={`test-sort-filter`}
                  />
                    <button  className='create-account-btn' onClick={()=>{setCreateTestWindow(true)}}>  
                      <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"/></svg>
                      <span>Create test</span>
                    </button>
                </div>
                {tests.map((test, i)=>
                  <TestBlock refetch={getTests} key={test.id} {...test} />
                )}
                {
                    (tests.length === 0 && loadedStatus) &&
                    <NotFoundBlock />
                }
                <div ref={sentinelRef} style={{display: loadedStatus?"none":"block"}}>
                  <TestBlockSkeleton />
                  <TestBlockSkeleton />
                  <TestBlockSkeleton />
                </div>
              </div>
        </div>
        </div>
        
      </div>
    );
  }
  
export default AdminTests;