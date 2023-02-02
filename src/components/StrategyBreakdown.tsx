import { ColDef, ModuleRegistry, ValueFormatterParams } from "ag-grid-community"
import { SetFilterModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react";
import { Strategy } from "./Strategies"
import './StrategyBreakdown.css';

ModuleRegistry.registerModules([
  SetFilterModule,
]);

const defaultColDef: ColDef = {
  sortable: true,
  flex: 1,
  floatingFilter: true,
}


function decimalFormatter(params: ValueFormatterParams) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(params.value)
}

function currencyFormatter(params: ValueFormatterParams) {
  return new Intl.NumberFormat('en-US', { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(params.value)
}

const columnDefs: ColDef[] = [
  { field: "desk_name", headerName: "Desk Name", filter: 'agMultiColumnFilter' },
  { field: "name", headerName: "Name", filter: 'agMultiColumnFilter' },
  {
    field: "1y_sharpe", headerName: "1Y Sharpe", valueFormatter: decimalFormatter, sort: "desc",
    cellClassRules: {
      'rag-green': params => params.value >= 2,
      'rag-red': params => params.value < 1
    },
    filter: 'agNumberColumnFilter',
    type: "rightAligned",
  },
  {
    field: "1y_pnl", headerName: "1Y Pnl (k$)", valueFormatter: currencyFormatter,
    cellClassRules: {
      'rag-green': params => params.value > 0,
      'rag-red': params => params.value < 0
    },
    filter: 'agNumberColumnFilter',
    type: "rightAligned",
  },
  {
    field: "1y_stddev_pnl", headerName: "1Y StdDev Pnl (k$)", valueFormatter: currencyFormatter,
    filter: 'agNumberColumnFilter',
    type: "rightAligned",
  },
  {
    field: "1y_net_pnl", headerName: "1Y Net Pnl (k$)", valueFormatter: currencyFormatter,
    cellClassRules: {
      'rag-green': params => params.value > 0,
      'rag-red': params => params.value < 0
    },
    filter: 'agNumberColumnFilter',
    type: "rightAligned",
  }
]

function randomNumVal(lowerBound: number, upperBound: number) {
  return lowerBound + Math.random() * (upperBound - lowerBound);
}


export const StrategyBreakdown = () => {
  const [rowData] = useState(() => {
    let data = [];
    for (let i = 0; i < 27; i++) {
      data.push({
        "desk_name": `Desk${i}`,
        "name": `Strategy ${String.fromCharCode('A'.charCodeAt(0) + i)}`,
        "1y_sharpe": randomNumVal(0.5, 3.5),
        "1y_pnl": randomNumVal(-100, 500),
        "1y_stddev_pnl": randomNumVal(10, 20),
        "1y_net_pnl": randomNumVal(200, 300)
      })
    }

    return data;
  });

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>

      <div className="ag-theme-balham" style={{ height: "100%", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection="single"
          onGridReady={(event) => event.api.sizeColumnsToFit()}
        />
      </div>
    </div>
  )
}