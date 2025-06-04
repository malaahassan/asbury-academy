import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import TestLineGraphContainer from '../components/Tests/TestLineGraphContainer.jsx';
import TestBarChartContainer from '../components/Tests/TestBarChartContainer.jsx';
import UserTestCards from '../components/Tests/UserTestCards.jsx';
import TestHistoryContainer from '../components/Tests/TestHistoryContainer.jsx';
import React, { useRef, useContext } from 'react';
import { LoginContext } from '../components/Contexts/LoginContext';

function ACTTests() {
    const { logData, setLogData } = useContext(LoginContext);
    const containerRef = useRef();
    return (
        <div className="inner-content">
          <Sidebar page='act'/>
          <div className="inner-content-with-header">
            <Header />
            <div className="test-page-container" ref={containerRef}>
              <h3 className="dashboard-header">ACT Overview</h3>
              <div className="dashboard-graphs-container">
                <TestLineGraphContainer ready={true} user={logData.user_id} type="act" accounts={false}/>
                <TestBarChartContainer ready={true} user={logData.user_id} type="act" accounts={false}/>
              </div>

              <TestHistoryContainer title="Previous ACT Tests" ready={true} type="act" user={logData.user_id} control={true} />

              <UserTestCards title="ACT Tests" type="act" containerRef={containerRef}/>
          
            </div>
            
          </div>
        </div>
    );
  }
  
export default ACTTests;