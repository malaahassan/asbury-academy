import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import ActivityCards from '../components/Dashboard/ActivityCards.jsx';
import LineGraph from '../components/Charts/LineGraph.jsx';
import DonutChart from '../components/Charts/DonutChart.jsx';
import AssignmentsHistoryContainer from '../components/Assignments/AssignmentsHistoryContainer.jsx';
import {useContext } from 'react';
import { LoginContext } from '../components/Contexts/LoginContext';

function Dashboard() {
  const { logData, setLogData } = useContext(LoginContext);
  
    return (
        <div className="inner-content">
          <Sidebar page='dashboard'/>
          <div className="inner-content-with-header">
            <Header />
            <div className="dashboard-container">
              <h3 className="dashboard-header">Hello, {logData.user_first_name} {logData.user_last_name} 👋</h3>
              <p className="dashboard-sub-header">Let's learn something new today!</p>
              <h3 className="dashboard-header" style={{marginTop: "40px"}}>Overview</h3>
              <ActivityCards tests={logData.dashboard.total_tests} videos={logData.dashboard.total_videos} posts={logData.dashboard.total_posts}/>
              <div className="dashboard-graphs-container" style={{marginBottom: 30}}>
                <div className="dashboard-graph-card">
                <LineGraph 
                    series={logData.dashboard.line.series} 
                    categories={logData.dashboard.line.categories} 
                    colors={['#de7258', '#3bb47f', '#1561b4']}  
                  />
                </div>
                <div className="dashboard-graph-card">
                  <DonutChart 
                    series={logData.dashboard.donut.series} 
                    categories={logData.dashboard.donut.categories} 
                    colors={['#008ffb', '#00e396', '#ff4560', '#feb019','#775dd0','#36ffeb']}  
                  />
                </div>
              </div>
              {/* <AssignmentsHistoryContainer /> */}
            </div>
          </div>
        </div>
    );
  }
  
export default Dashboard;