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

const defaultColDef: ColDef = {
  sortable: true,
  flex: 1,
  minWidth: 1,
  floatingFilter: true,
}
const columnDefs: ColDef[] = [
  { field: 'strategy', filter: 'agMultiColumnFilter' },
  { field: 'author', filter: 'agMultiColumnFilter' }
]

export const Strategies = () => {
  const rowData = [
    { strategy: "Alpha 1 Strategy", author: "John Smith" },
    { strategy: "Beta 2 Strategy", author: "Jane Doe" },
    { strategy: "Charlie 3 Strategy", author: "Miles Morales" }
  ]
  const gridRef = useRef<AgGridReact>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    alert(JSON.stringify(selectedRows));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
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