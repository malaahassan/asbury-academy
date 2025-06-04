import AssignmentTab from './AssignmentTab.jsx';

function AssignmentsHistoryTable() {
  
    return (
        <table>
          <thead>
            <tr>
              <th>TASK INFO.</th>
              <th>GRADE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <AssignmentTab type="test" name="ACT January Test - English" time="5 mins ago" grade="50/65" status="completed" />
            <AssignmentTab type="file" name="Reading Passages" time="25 mins ago" grade="90/100" status="completed" />
            <AssignmentTab type="file" name="Digitl SAT Model 1" time="50 mins ago" grade="—" status="pending"/>
            <AssignmentTab type="test" name="EST Official Test 1 - Literacy I" time="1 hour ago" grade="25/44" status="completed"/>
            <AssignmentTab type="video" name="Tips & Tricks Writing" time="3 hours ago" grade="—" status="completed"/>

          </tbody>
        </table>
    );
  }
  
export default AssignmentsHistoryTable;