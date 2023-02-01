import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { useState } from 'react';
import { ColDef, ModuleRegistry } from 'ag-grid-community';
import { useCallback, useRef } from 'react';
import { SetFilterModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  SetFilterModule,
]);

export type Strategy = {
  name: string;
  author: string;
}

const defaultColDef: ColDef = {
  sortable: true,
  flex: 1,
  minWidth: 100,
  floatingFilter: true,
}
const columnDefs: ColDef[] = [
  { field: 'name', headerName: "Strategy", filter: 'agMultiColumnFilter' },
  { field: 'author', filter: 'agMultiColumnFilter' }
]

const rowData: Strategy[] = [
  { name: "Alpha 1 Strategy", author: "John Smith" },
  { name: "Beta 2 Strategy", author: "Jane Doe" },
  { name: "Charlie 3 Strategy", author: "Miles Morales" }
]

export interface StrategyGridProps {
  onStrategySelected: (strategy: Strategy) => void;
}

export const Strategies = ({ onStrategySelected }: StrategyGridProps) => {
  const gridRef = useRef<AgGridReact>(null);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    onStrategySelected(selectedRows[0]);
  }, [onStrategySelected]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowSelection="single"
        // onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
}