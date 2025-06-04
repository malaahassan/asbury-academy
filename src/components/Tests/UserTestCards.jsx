import TestCard from '../Tests/TestCard.jsx';
import React, { useEffect, useState, useRef } from 'react';
import TestCardSkeleton from '../Skeletons/TestCardSkeleton';
import NotFoundBlock from '../Admin/NotFoundBlock';
import SearchBar from '../Tools/SearchBar';
import DropDown from '../Tools/DropDown';
import { useXHR } from "../Contexts/UseXHR";


function UserTestCards({title, type, containerRef}) {
    const { sendRequest } = useXHR();

    const [tests, setTests] = useState([]);
    const [loadedStatus, setLoadedStatus] = useState(false);
    const [testsLoading, setTestsLoading] = useState(false);
    const [sortTest, setSortTest] = useState("release-desc");
    const testsLoadingRef = useRef(false);
    const sentinelRef = useRef();
    const testsTimeout = useRef();
    const testsCountRef = useRef(0);
    const timeOutRef = useRef();
    const filter = useRef({
        sort: sortTest,
        searchBar: ""
      });

      function resetTests() {
          testsCountRef.current = 0;
          testsLoadingRef.current = true;
          setLoadedStatus(false);
          setTests([]);
          getTests();
        }
      
        useEffect(() => {
          filter.current.sort = sortTest;
          resetTests();
        },[sortTest]);
      
        function onInputChange(e){
          filter.current.searchBar = e.target.value;
          clearTimeout(timeOutRef.current);
          timeOutRef.current = setTimeout(()=>{
            resetTests();
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
    
          if (containerBottom >= skeletonTop - offset && !testsLoadingRef.current) {
            getTests();
          }
        };

        //getTests();
    
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
            testsLoadingRef.current = true;
            setTestsLoading(true);
          },
          "/back/get_tests.php",
          {
            limit: testsCountRef.current + 5,
            type: type,
            sort_section: filter.current.sort,
            search: filter.current.searchBar
          },
          testsTimeout,
          (response) => {
              setTests(response[1]);
              
              testsCountRef.current = response[1].length;
              /*if(response[0] <= 0){
                navigate('/404');
              }*/
              if(response[1].length == response[0]){
                testsLoadingRef.current = true;
                setLoadedStatus(true);
              }
          },
          () => {
              testsLoadingRef.current = false;
              setTestsLoading(false);
          },
          {},
          () => {
            testsLoadingRef.current = true;
          }
          
        );

      }
  
    return (
        <> 
          <h3 className="dashboard-header" style={{marginTop: "50px"}}>{title}</h3>
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
                    value={sortTest}
                    onChange={setSortTest} 
                    sections={[]}
                    menuId={`test-sort-filter`}
              />
          </div>
          <div className="test-card-containers">
            {
                tests.map((test, i)=>
                    <TestCard
                        {...test}
                        key={test.id}  
                    />
                )
            }
            {
                    (tests.length === 0 && loadedStatus) &&
                    <NotFoundBlock />
            }
            <div ref={sentinelRef} style={{display: loadedStatus?"none":"flex", flexDirection: "column", gap: 30}}>
              <TestCardSkeleton />
              <TestCardSkeleton />
            </div>
        </div>
        </>
        
              
             
    );
  }
  
export default UserTestCards;