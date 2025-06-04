function AuthorizedTable({type_name, subjects}) {
  
    return (
      <>
        <table className="not-responsive">
          <thead>
            <tr>
              <th>{type_name} NAME</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, i) => <tr key={i}><td>{subject.name}</td></tr>)}
          </tbody>
        </table>
        {subjects.length <= 0 && <div style={{height: 175}} className="empty-table-container">Nothing to show here.</div>}
      </>
        
    );
  }
  
export default AuthorizedTable;