import AssignmentsHistoryTable from './AssignmentsHistoryTable.jsx';
function AssignmentsHistoryContainer() {
  
    return (
        <div className="dashboard-assignments-container">
        <h3 className="dashboard-header">Previous Assignments</h3>
        <AssignmentsHistoryTable />
      </div>
    );
  }
  
export default AssignmentsHistoryContainer;