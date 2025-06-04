import { React, useEffect, useState, useRef } from 'react';
import DonutChart from '../Charts/DonutChart.jsx';
import DonutChartSkeleton from '../Skeletons/DonutChartSkeleton.jsx';
import DropDown from '../Tools/DropDown';
import { useXHR } from "../Contexts/UseXHR";


function TestDonutChartContainer({ready, test, type, accounts}) {
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

    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);


    const dataTimeout = useRef();

    
    useEffect(() => {
        getData();
    }, [type, ready]);




    

    function getData(){
        if(ready){
                sendRequest(
                    ()=>{
                        setDataLoading(true);
                    },
                    "/back/get_tests_donut.php",
                    {
                      type: type,
                      test: test,
                      sections: JSON.stringify(sections)
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
            
            
        } else {
            setDataLoading(true);
        }
    }

    
    
    
      return (
        <div className={`dashboard-graph-card${accounts ? " account-graph-card" : ""}`}>
            <div className="dashboard-graph">
                {!dataLoading ?
                <DonutChart 
                    series={series} 
                    categories={categories} 
                    colors={colors} 
                />
                :
                <DonutChartSkeleton />
                }
            </div>
            
            
        </div>
      );
  }
  
export default TestDonutChartContainer;