import { ColDef } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"

const defaultColDef: ColDef = {
  sortable: true,
  flex: 1,
  minWidth: 1,
  // floatingFilter: true,
}

const columnDefs: ColDef[] = [
  { field: "desk_name" },
  { field: "name" },
  { field: "1y_sharpe" },
  { field: "1y_pnl" },
  { field: "1y_stddev_pnl" },
  { field: "1y_net_pnl" }
]

export const StrategyBreakdown = () => {
  const rowData: object[] = [];
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        // ref={gridRef}
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowSelection="single"
      // onGridReady={onGridReady}
      // onSelectionChanged={onSelectionChanged}
      />
    </div>
  )
}