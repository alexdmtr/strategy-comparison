import { useState } from 'react';
import './App.css';
import { Strategies, Strategy } from './components/Strategies';
import { StrategyBreakdown } from './components/StrategyBreakdown';
import { PnlChart } from './charts/pnl';
import SplitPane from 'react-split-pane';
import { MaxPositionsChart } from './charts/MaxPositions';
import { DeltaPositionsChart } from './charts/DeltaPositions';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

function App() {
  const [selectedStrategy, onStrategySelected] = useState<Strategy | null>(null);

  return (
    <div className="App">
      {/* @ts-ignore */}
      <SplitPane split='vertical' minSize={50} defaultSize={800} className="Reizer">
        <div style={{ height: "100%", width: "100%" }}>
          <StrategyBreakdown />
        </div>
        <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
          <PnlChart />
          <MaxPositionsChart />
          <DeltaPositionsChart />
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
