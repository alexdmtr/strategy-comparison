import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Strategies, Strategy } from './components/Strategies';
import { StrategyBreakdown } from './components/StrategyBreakdown';
import { PnlChart } from './charts/pnl';

function App() {
  const [selectedStrategy, onStrategySelected] = useState<Strategy | null>(null);

  return (
    <div className="App">
      <Strategies onStrategySelected={onStrategySelected} />
      {selectedStrategy !== null && <StrategyBreakdown strategy={selectedStrategy} />}
      <PnlChart />
    </div>
  );
}

export default App;
