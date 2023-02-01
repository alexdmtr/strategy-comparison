import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Strategies, Strategy } from './components/Strategies';
import { StrategyBreakdown } from './components/StrategyBreakdown';

function App() {
  const [selectedStrategy, onStrategySelected] = useState<Strategy | null>(null);

  return (
    <div className="App">
      <Strategies onStrategySelected={onStrategySelected} />
      {selectedStrategy !== null && <StrategyBreakdown strategy={selectedStrategy} />}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
