

function TestHistoryRow({name, time, section, duration, score, person, max_score, test_interface, id}) {
    function rowClick(){
      window.location.href = `/test/${test_interface}/index.html?section=review&id=${id}`;
    }
    return (
        <tr onClick={rowClick}>
        <td data-label="TEST INFO">
          <div className="dashboard-table-task">
            <div className="dashboard-table-task-title" title={name}>
                {name}
            </div>
            {person && 
            <div className="dashboard-table-task-due">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"></path></svg>
              {person.first_name} {person.last_name}
            </div>
            }
            <div className="dashboard-table-task-due">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
              </svg>
              {time}
            </div>
            
          </div>
        </td>
        <td data-label="SECTION">{section}</td>
        <td data-label="SCORE">{score}/{max_score}</td>
        <td data-label="DURATION">{duration}</td>
        {/* <td>
          <button
            className="test-card-button table-button black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
            </svg>
            Review
          </button>
        </td> */}
      </tr> 
    );
}

export default TestHistoryRow;