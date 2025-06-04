import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import TestLineGraphContainer from '../components/Tests/TestLineGraphContainer.jsx';
import TestBarChartContainer from '../components/Tests/TestBarChartContainer.jsx';
import UserTestCards from '../components/Tests/UserTestCards.jsx';
import TestHistoryContainer from '../components/Tests/TestHistoryContainer.jsx';
import React, { useRef, useContext } from 'react';
import { LoginContext } from '../components/Contexts/LoginContext';
const sections = ["Writing", "Reading", "Math without Calc", "Math with Calc"];
const colors = ['#008ffb', '#00e396', '#ff4560', '#feb019'];

function SATTests() {
    const { logData, setLogData } = useContext(LoginContext);
  
    const containerRef = useRef();

  
    return (
        <div className="inner-content">
          <Sidebar page='sat'/>
          <div className="inner-content-with-header">
            <Header />
            <div className="test-page-container" ref={containerRef}>
              <h3 className="dashboard-header">SAT Overview</h3>
              <div className="dashboard-graphs-container">
                <TestLineGraphContainer ready={true} user={logData.user_id} type="sat" accounts={false}/>
                <TestBarChartContainer ready={true} user={logData.user_id} type="sat" accounts={false}/>
              </div>

              <TestHistoryContainer ready={true} type="sat" user={logData.user_id} control={true} title="Previous SAT Tests"/>

              <UserTestCards title="SAT Tests" type="sat" containerRef={containerRef}/>
            </div>
            
          </div>
        </div>
    );
  }
  
export default SATTests;