import './App.css';
import { StrategyBreakdown } from './components/StrategyBreakdown';
import { PnlChart } from './charts/pnl';
import SplitPane from 'react-split-pane';
import { MaxPositionsChart } from './charts/MaxPositions';
import { DeltaPositionsChart } from './charts/DeltaPositions';

import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';


import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import { useState } from 'react';
import { Strategy } from './hooks/useStrategies';

function App() {
  const [selectedRows, setSelectedRows] = useState<Strategy[]>([]);

  return (
    <div className="App">
      {/* @ts-ignore */}
      <SplitPane split='vertical' minSize={50} defaultSize={800} className="Reizer">
        <div style={{ height: "100%", width: "100%" }}>
          <StrategyBreakdown onRowSelectionChanged={setSelectedRows} />
        </div>
        <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
          {selectedRows.length > 0 && <PnlChart strategies={selectedRows} />}
          {selectedRows.length > 0 && <MaxPositionsChart strategies={selectedRows} />}
          {selectedRows.length > 0 && <DeltaPositionsChart strategies={selectedRows} />}
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
