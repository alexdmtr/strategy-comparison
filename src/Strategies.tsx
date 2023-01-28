import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState } from 'react';
import { ColDef } from 'ag-grid-community';

const columnDefs: ColDef[] = [
  { field: 'strategy', filter: true, sortable: true },
  { field: 'author', filter: true, sortable: true }
]
export const Strategies = () => {
  const rowData = [
    { strategy: "Alpha 1 Strategy", author: "John Smith" },
    { strategy: "Beta 2 Strategy", author: "Jane Doe" },
    { strategy: "Charlie 3 Strategy", author: "Miles Morales" }
  ]
  // const [rowData] = useState([
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxster", price: 72000 }
  // ]);

  // const [columnDefs] = useState<ColDef[]>([
  //   { field: 'make' },
  //   { field: 'model' },
  //   { field: 'price' }
  // ])

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  );
}