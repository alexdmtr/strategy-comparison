import { ColDef } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { useMemo } from "react";
import { Strategy } from "./Strategies"
import './StrategyBreakdown.css';

const defaultColDef: ColDef = {
  sortable: true,
  flex: 1,
  // minWidth: 1,
  // floatingFilter: true,
}

const columnDefs: ColDef[] = [
  { field: "desk_name", headerName: "DeskName" },
  { field: "name", headerName: "Name" },
  { field: "1y_sharpe", headerName: "1Y Sharpe" },
  { field: "1y_pnl", headerName: "1Y Pnl (k$)" },
  { field: "1y_stddev_pnl", headerName: "1Y StdDev Pnl (k$)" },
  { field: "1y_net_pnl", headerName: "1Y Net Pnl (k$)" }
]

function randomNumVal() {
  return 1000 - Math.random() * 2000;
}

export interface StrategyBreakdownProps {
  strategy: Strategy;
}

export const StrategyBreakdown = ({ strategy }: StrategyBreakdownProps) => {
  const rowData = useMemo(() => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        "desk_name": `Desk${i}`,
        "name": `Name${i}`,
        "1y_sharpe": randomNumVal(),
        "1y_pnl": randomNumVal(),
        "1y_stddev_pnl": randomNumVal(),
        "1y_net_pnl": randomNumVal()
      })
    }

    return data;
  }, []);
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact

        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowSelection="single"
        onGridReady={(event) => event.api.sizeColumnsToFit()}
      />
    </div>
  )
}