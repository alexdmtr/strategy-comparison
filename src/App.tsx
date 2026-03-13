import './App.css';
import { StrategyBreakdown } from './components/StrategyBreakdown';
import { PnlChart } from './charts/pnl';
import SplitPane from 'react-split-pane';
import { MaxPositionsChart } from './charts/MaxPositions';
import { DeltaPositionsChart } from './charts/DeltaPositions';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

import { useState } from 'react';
import { Strategy } from './hooks/useStrategies';
import { useMuiTheme, useTheme } from './hooks/useTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';

function App() {
  const [selectedRows, setSelectedRows] = useState<Strategy[]>([]);
  const [theme] = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div>
        {/* @ts-ignore */}
        <SplitPane split='vertical' minSize={50} defaultSize={800} className={`Reizer ${theme === 'dark' ? 'dark-theme' : ''}`}>
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
    </ThemeProvider>
  );
}

export default App;
