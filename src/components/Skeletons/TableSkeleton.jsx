

function TableSkeleton({columns, lines_number, rows_number}) {
    return (
  
        <>
            { [...Array(rows_number)].map((row, i) => 
                    <tr key={i} style={{ pointerEvents: "none" }}>
                    {columns.map((column, j) => 
                    <td key={j} data-label={column}>
                        {lines_number > 1 && j == 0 ? 
                        <div className="dashboard-table-task" style={{ width: "100%", minHeight: (25 + 18*(lines_number - 1)) }}>
                            <div className="dashboard-table-task-title" style={{ width: "100%" }}>
                                <div className="skeleton-line" style={{ width: "75%" }} />
                            </div>
                            <div className="dashboard-table-task-due">
                                <div
                                className="skeleton-line"
                                style={{ width: "45%", marginTop: 5 }}
                                />
                            </div>
                        </div>
                        :
                        <div className="skeleton-line" style={{ width: "60%" }} />
                        }
                    </td>
                    )}
                </tr>

                )}
        </>

    );
  }
  
  export default TableSkeleton;
  