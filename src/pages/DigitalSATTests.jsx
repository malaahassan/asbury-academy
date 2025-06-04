import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import TestLineGraphContainer from '../components/Tests/TestLineGraphContainer.jsx';
import TestBarChartContainer from '../components/Tests/TestBarChartContainer.jsx';
import UserTestCards from '../components/Tests/UserTestCards.jsx';
import TestHistoryContainer from '../components/Tests/TestHistoryContainer.jsx';
import React, { useRef, useContext } from 'react';
import { LoginContext } from '../components/Contexts/LoginContext';
const sections = ["Reading and Writing"];
const colors = ['#ef4794'];

function DigitalSATTests() {
    const { logData, setLogData } = useContext(LoginContext);
  
    const containerRef = useRef();
  
  
    return (
        <div className="inner-content">
          <Sidebar page='digitalsat'/>
          <div className="inner-content-with-header">
            <Header />
            <div className="test-page-container" ref={containerRef}>
              <h3 className="dashboard-header">Digital SAT Overview</h3>

              <div className="dashboard-graphs-container">
                <TestLineGraphContainer ready={true} user={logData.user_id} type="digitalsat" accounts={false}/>
                <TestBarChartContainer ready={true} user={logData.user_id} type="digitalsat" accounts={false}/>
              </div>

              <TestHistoryContainer ready={true} type="digitalsat" user={logData.user_id} control={true} title="Previous Digital SAT Tests"/>

              <UserTestCards title="Digital SAT Tests" type="digitalsat" containerRef={containerRef}/>
            </div>
            
          </div>
        </div>
    );
  }
  
export default DigitalSATTests;