import TestHistoryRow from './TestHistoryRow.jsx';
import TableSkeleton from '../Skeletons/TableSkeleton.jsx';

function TestHistoryTable({type, tests, loading, show_tests_number, by_user}) {
    return (
        <table className='hover-table'>
          <thead>
            <tr>
              <th>{type == "reading-workout" || type == "writing-workout" ? "WORKOUT INFO." : "TEST INFO."}</th>
              {(type != "reading-workout" && type != "writing-workout") &&
                <th>SECTION</th>
              }
              <th>SCORE</th>
              <th>DURATION</th>
              {/* <th>ACTION</th> */}
            </tr>
          </thead>
          <tbody>
            { !loading && tests.length > 0 ?

              tests.map((test, index) => <TestHistoryRow key={test.id} {...test} /> )
            : loading &&

            <TableSkeleton columns={["TEST INFO.", "SECTION", "SCORE", "DURATION"]} lines_number={by_user ? 2 : 3} rows_number={show_tests_number}/>


            }

            
          </tbody>
        </table>
    );
}

export default TestHistoryTable;