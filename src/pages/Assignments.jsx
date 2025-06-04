import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import AssignmentsHistoryContainer from '../components/Assignments/AssignmentsHistoryContainer';
import AssignmentCard from '../components/Assignments/AssignmentCard';


function Assignments() {

  
    return (
        <div className="inner-content">
          <Sidebar page='assignments'/>
          <div className="inner-content-with-header">
            <Header />
            <div className="dashboard-container">
              <AssignmentsHistoryContainer />

              <h3 className="dashboard-header">My Assignments</h3>
              <div className="assignments-cards-container">
                  <AssignmentCard 
                    name="ACT January Test - English"
                    type="test" 
                    time="Today, at 5:00 pm"
                  />
                  <AssignmentCard 
                    name="Reading Tips & Tricks"
                    type="video" 
                    time="Today, at 5:00 pm"
                  />
                  <AssignmentCard 
                    name="Document #1"
                    type="file" 
                    time="Today, at 5:00 pm"
                  />
                  
                  <AssignmentCard 
                    name="Document #2"
                    type="file" 
                    time="Today, at 5:00 pm"
                  />
                  <AssignmentCard 
                    name="EST January Test - Literacy I"
                    type="test" 
                    time="Today, at 5:00 pm"
                  />
                  <AssignmentCard 
                    name="Writing Tips & Tricks"
                    type="video" 
                    time="Today, at 5:00 pm"
                  />
              </div>
            </div>
            
            
          </div>
        </div>
    );
  }
  
export default Assignments;