import { Button, Checkbox, Icon, InputGroup, Menu, MenuDivider, MenuItem, Switch } from "@blueprintjs/core";
import { DateRangePicker } from "@blueprintjs/datetime";
import { MenuItem2, Popover2 } from "@blueprintjs/popover2";
import { ColDef, ModuleRegistry, ValueFormatterParams } from "ag-grid-community"
import { SetFilterModule } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Strategy, useStrategies } from "../hooks/useStrategies";
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
  { field: "name", headerName: "Name", filter: 'agMultiColumnFilter' },
  { field: "desk_name", headerName: "Desk Name", filter: 'agMultiColumnFilter' },
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

export interface StrategyBreakdownProps {
  onRowSelectionChanged: (selectedRows: Strategy[]) => void;
}

export const StrategyBreakdown = ({ onRowSelectionChanged }: StrategyBreakdownProps) => {
  const gridRef = useRef<AgGridReact>(null);
  const [multiselect, setMultiselect] = useState(false);
  const rowData = useStrategies();

  const onSelectionChanged = useCallback(() => {
    const rows = gridRef.current!.api.getSelectedRows();
    onRowSelectionChanged(rows);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <h3 className="bp4-heading" style={{ margin: 8 }}>Strategy Perf Summaries</h3>
      <div style={{ display: "flex", flexDirection: "row", gap: 8, margin: 8, width: "100%" }}>
        <InputGroup placeholder="Search strategy..." rightElement={<Button icon="search" minimal />} type="search" />
        <InputGroup placeholder="Search by author..." rightElement={<Button icon="search" minimal />} type="search" />
        <div style={{ marginLeft: "auto", marginRight: 15, display: "flex", flexDirection: "row", gap: 8 }}>
          <Checkbox checked={multiselect} onChange={() => setMultiselect(!multiselect)} label="Multiselect" style={{ marginTop: "auto", marginBottom: "auto" }} />
          <Popover2 content={
            <Menu>
              <MenuItem2 text="One Year" labelElement={<Icon icon="small-tick" />} />
              <MenuItem2 text="Two Years" />
              <MenuItem2 text="Five Years" />
              <MenuDivider />
              <MenuItem2 text="Custom date range…">
                <DateRangePicker />
              </MenuItem2>
            </Menu>}
          >
            <Button text="One year" icon="calendar" rightIcon="caret-down" />
          </Popover2>
        </div>
      </div>
      <div className="ag-theme-balham" style={{ flex: 1 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection={multiselect ? "multiple" : "single"}
          onGridReady={(event) => event.api.sizeColumnsToFit()}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  )
}