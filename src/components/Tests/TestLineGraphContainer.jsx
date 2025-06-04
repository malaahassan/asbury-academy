import { React, useEffect, useState, useRef, useContext } from 'react';
import TestLineGraph from '../Charts/TestLineGraph.jsx';
import LineChartSkeleton from '../Skeletons/LineChartSkeleton.jsx';
import DropDown from '../Tools/DropDown';
import { LoginContext } from '../Contexts/LoginContext';
import { useXHR } from "../Contexts/UseXHR";


function TestLineGraphContainer({ready, user, type, accounts}) {
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
    const { logData, setLogData } = useContext(LoginContext);

    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);

    const currentYear = new Date(logData.time).getFullYear();
    const currentMonth = new Date(logData.time).getMonth() + 1; // Get current month (1-based)

    const monthsList = Array.from({ length: currentMonth }, (_, i) => i + 1).map((m) => ({
        displayName: new Date(currentYear, m - 1, 1).toLocaleString("en-US", { month: "long" }), 
        value: m
    })); // Reverse order
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i).map((y) => ( 

        {displayName: y, value: y}
    ));

    const [months, setMonths] = useState(monthsList);
    const [dataLoading, setDataLoading] = useState(true);
    const [mode, setMode] = useState(1);
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(monthsList.length);

    const monthRef = useRef();
    const yearRef = useRef();
    const dataTimeout = useRef();

    useEffect(() => {
        monthRef.current = month;
        if(!dataLoading){
            getData();
        }
    }, [month]);

    useEffect(() => {
        yearRef.current = year;
        if(year == currentYear){ 
            setMonths(monthsList);
            setMonth(monthsList.length);
            monthRef.current = monthsList.length;
        } else {
            setMonths(Array.from({ length: 12 }, (_, i) => i + 1).map((m) => ({
                displayName: new Date(currentYear, m - 1, 1).toLocaleString("en-US", { month: "long" }),
                value: m
            })));
            setMonth(1);
            monthRef.current = 1;
        }
        getData();
         
    }, [type, ready, year, mode]);




    

    function getData(){
    if(ready){

        

        if(user){
            sendRequest(
                ()=>{
                    setDataLoading(true);
                },
                "/back/get_tests_line_graph.php",
                {
                    type: type,
                    user: user,
                    sections: JSON.stringify(sections),
                    mode: mode,
                    year: yearRef.current,
                    month: monthRef.current
                },
                dataTimeout,
                (response) => {
                    setCategories(response.categories);
                    setSeries(response.series);
                },
                () => {
                    setDataLoading(false);
                }
                
              );
        } else if(test){
            sendRequest(
                ()=>{
                    setDataLoading(true);
                },
                "/back/get_tests_line_graph.php",
                {
                    type: type,
                    test: test,
                    sections: JSON.stringify(sections),
                    mode: mode,
                    year: yearRef.current,
                    month: monthRef.current
                },
                dataTimeout,
                (response) => {
                    setCategories(response.categories);
                    setSeries(response.series);
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
    
    
      return (
        <div className={`dashboard-graph-card${accounts ? " account-graph-card" : ""}`}>
            <div className={`dashboard-graph-options${dataLoading ? " disabled-settings":""}`}>
                <DropDown
                    options={[
                        {
                            value: 1,
                            displayName: "Daily"
                        },
                        {
                            value: 2,
                            displayName: "Weekly"
                        },
                        {
                            value: 3,
                            displayName: "Monthly"
                        },
                        
                        
                    ]}
                    value={mode}
                    onChange={setMode}
                    sections={[]}
                    menuId={`mode-linegraph-filter-${user}`}
                />
                {mode == 1 &&
                    <DropDown
                        options={months}
                        value={month}
                        onChange={setMonth}
                        sections={[]}
                        menuId={`month-linegraph-filter-${user}`}
                    />
                }
                <DropDown
                        options={years}
                        value={year}
                        onChange={setYear}
                        sections={[]}
                        menuId={`year-linegraph-filter-${user}`}
                />
                
            </div>
            <div className="dashboard-graph">
                {!dataLoading ?
                <TestLineGraph 
                    series={series} 
                    categories={categories} 
                    colors={colors} 
                />
                :
                <LineChartSkeleton />
                }
            </div>
            
            
        </div>
      );
  }
  
export default TestLineGraphContainer;