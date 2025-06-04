import { React, useEffect, useState, useRef } from 'react';
import BarChart from '../Charts/BarChart.jsx';
import BarChartSkeleton from '../Skeletons/BarChartSkeleton.jsx';
import DropDown from '../Tools/DropDown';
import { useXHR } from "../Contexts/UseXHR";
import UseOutsideClick from '../Window/UseOutsideClick';


function TestBarChartContainer({ready, user, test, type, accounts}) {
    const { sendRequest } = useXHR();
    
    let sections;
    let colors;
    if(type === "act"){
        colors = ['#008ffb', '#00e396', '#ff4560'];
        sections = ["English", "Reading", "Math"];
    } else if(type === "sat"){
        colors = ['#008ffb', '#00e396', '#ff4560', '#feb019'];
        sections = ["Writing", "Reading", "Math without Calc", "Math with Calc"];
    } else if(type === "est"){
        colors = ['#008ffb', '#00e396', '#ff4560', '#feb019'];
        sections = ["Literacy I", "Literacy II", "Math without Calc", "Math with Calc"];
    } else if(type === "digitalsat"){  
        colors = ['#ef4794'];
        sections = ["Reading and Writing"];
    } else if(type == "reading_workout" || type == "writing_workout"){
        colors = ['#ef4794'];
        sections = ["Workout"];
    }

    function formatDateRange(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
      
        const sameDay = startDate.toDateString() === endDate.toDateString();
        const sameMonth = startDate.getMonth() === endDate.getMonth();
        const sameYear = startDate.getFullYear() === endDate.getFullYear();
      
        const optionsDate = { month: 'short', day: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
        const optionsFull = { year: 'numeric', month: 'short', day: 'numeric' };
      
        if (!start || !end || isNaN(startDate) || isNaN(endDate)) {
          return "Add time range";
        }
      
        if (sameDay) {
          // Example: May 5, 2025, 9:00 AM – 5:00 PM
          return `${startDate.toLocaleDateString(undefined, optionsFull)}, ${startDate.toLocaleTimeString(undefined, optionsTime)} – ${endDate.toLocaleTimeString(undefined, optionsTime)}`;
        }
      
        if (sameMonth && sameYear) {
          // Example: May 5, 9:00 AM – 30, 5:00 PM, 2025
          return `${startDate.toLocaleDateString(undefined, optionsDate)}, ${startDate.toLocaleTimeString(undefined, optionsTime)} – ${endDate.getDate()}, ${endDate.toLocaleTimeString(undefined, optionsTime)}, ${endDate.getFullYear()}`;
        }
      
        if (sameYear) {
          // Example: May 5, 9:00 AM – Jun 1, 5:00 PM, 2025
          return `${startDate.toLocaleDateString(undefined, optionsDate)}, ${startDate.toLocaleTimeString(undefined, optionsTime)} – ${endDate.toLocaleDateString(undefined, optionsDate)}, ${endDate.toLocaleTimeString(undefined, optionsTime)}, ${endDate.getFullYear()}`;
        }
      
        // Different years
        return `${startDate.toLocaleDateString(undefined, optionsFull)}, ${startDate.toLocaleTimeString(undefined, optionsTime)} – ${endDate.toLocaleDateString(undefined, optionsFull)}, ${endDate.toLocaleTimeString(undefined, optionsTime)}`;
      }
      

    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const [dateText, setDateText] = useState("Add time range");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");


    const dataTimeout = useRef();

    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    const [sortSection, setSortSection] = useState(user ? "release-desc" : "name-asc");

    const dateFilterMenuRef = useRef();
    const dateFilterButtonRef = useRef();

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    
    useEffect(() => {
        getData();
    }, [page, type, ready]);

    useEffect(() => {
        if(!isFilterMenuOpen){
            //setPage(1); 
            setDateText(formatDateRange(dateFrom, dateTo));
        
            if(page != 1){
                setPage(1);  
            } else {
                if(!dataLoading && !isFilterMenuOpen){
                    getData();
                }
            }
        }
    }, [sortSection, isFilterMenuOpen]);


    
    



    

    function getData(){
        if(ready){
            if(user){
                sendRequest(
                    ()=>{
                        setDataLoading(true);
                    },
                    "/back/get_tests_bar_chart_user.php",
                    {
                      page: page,
                      type: type,
                      user: user,
                      from: dateFrom && dateTo ? dateFrom : "",
                      to: dateFrom && dateTo ? dateTo : "",
                      sections: JSON.stringify(sections),
                      sort_section: sortSection
                    },
                    dataTimeout,
                    (response) => {
                        setCategories(response.categories);
                        setSeries(response.series);
                        setPages(response.pages);
                    },
                    () => {
                        setDataLoading(false);
                    }
                    
                  );
            } else {
                sendRequest(
                    ()=>{
                        setDataLoading(true);
                    },
                    "/back/get_tests_bar_chart_test.php",
                    {
                      page: page,
                      type: type,
                      test: test,
                      from: dateFrom && dateTo ? dateFrom : "",
                      to: dateFrom && dateTo ? dateTo : "",
                      sections: JSON.stringify(sections),
                      sort_section: sortSection
                    },
                    dataTimeout,
                    (response) => {
                        setCategories(response.categories);
                        setSeries(response.series);
                        setPages(response.pages);
                    },
                    () => {
                        setDataLoading(false);
                    }
                    
                  );
            }
            
        } else {
            setDataLoading(true);
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
    

    UseOutsideClick(dateFilterMenuRef, dateFilterButtonRef, ()=>setIsFilterMenuOpen(false));
      return (
        <div className={`dashboard-graph-card${accounts ? " account-graph-card" : ""}`}>
            <div className={`dashboard-graph-options${dataLoading ? " disabled-settings":""}`}>
                <div className="filter-time-range-container">
                    <button className={`filter-time-range-button${isFilterMenuOpen ? " filter-time-range-button-open" : ""}`} ref={dateFilterButtonRef} onClick={()=>setIsFilterMenuOpen(!isFilterMenuOpen)}>
                        {dateText}
                    </button>
                    <div className="filter-time-range-menu" ref={dateFilterMenuRef} style={{display: isFilterMenuOpen ? "block": "none"}}>

                        <div className="uniqueField-parent">
                            <span className="uniqueField-title">From</span>
                                <input className="uniqueField" type="datetime-local" max={dateTo} value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)}/>
                        </div>

                        <div className="uniqueField-parent">
                            <span className="uniqueField-title">To</span>
                                <input className="uniqueField" type="datetime-local" min={dateFrom} value={dateTo} onChange={(e)=>setDateTo(e.target.value)}/>
                        </div>
                    </div>
                </div>
                
                <DropDown
                    options={user ? [
                        {displayName: "Release (Newest)", value: "release-desc"},
                        {displayName: "Release (Oldest)", value: "release-asc"},
                        // {displayName: "Added (Latest)", value: "id-desc"},
                        // {displayName: "Added (Earliest)", value: "id-asc"},
                        {displayName: "Name (A - Z)", value: "name-asc"},
                        {displayName: "Name (Z - A)", value: "name-desc"}
                        
                        

                    ] :
                    [
                        {displayName: "Name (A - Z)", value: "name-asc"},
                        {displayName: "Name (Z - A)", value: "name-desc"}
                        
                        

                    ]
                    }
                    value={sortSection}
                    onChange={setSortSection} 
                    sections={[]}
                    menuId={`test-bar-chart-section-filter-${user || test}`}
                />

                <div className="dashboard-graph-options-second-container">
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
            <div className="dashboard-graph">
                {!dataLoading ?
                <BarChart 
                    series={series} 
                    categories={categories} 
                    colors={colors} 
                />
                :
                <BarChartSkeleton />
                }
            </div>
            
            
        </div>
      );
  }
  
export default TestBarChartContainer;