import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { DeltaPositionsChart } from "../charts/DeltaPositions";
import { MaxPositionsChart } from "../charts/MaxPositions";
import { PnlChart } from "../charts/pnl";
import { Strategy } from "../hooks/useStrategies";
import { useTheme } from "../hooks/useTheme";
import { columnDefs, defaultColDef } from "./StrategyBreakdown";

interface StrategySummaryProps {
  strategy: Strategy;
}

const StrategySummary = ({ strategy }: StrategySummaryProps) => {
  return (
    <div style={{ flex: 1 }}>
      <h4 className="bp4-heading">{strategy.name}</h4>
      {/* <div>
        <span>1Y Sharpe: {strategy["1y_sharpe"]}</span>
      </div> */}
      <PnlChart strategies={[strategy]} />
      <MaxPositionsChart strategies={[strategy]} />
      <DeltaPositionsChart strategies={[strategy]} />
    </div>
  )
}
export interface CompareStrategiesProps {
  strategies: Strategy[];
}

export const CompareStrategies = ({ strategies }: CompareStrategiesProps) => {
  const [theme] = useTheme();
  const gridClassName = useMemo(() => `ag-theme-balham${theme === 'dark' ? '-dark' : ''}`, [theme]);

  if (strategies.length !== 2) {
    return null;
  }

  return (
    <div>
      <div className={gridClassName}>
        <AgGridReact
          domLayout="autoHeight"
          rowData={strategies}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection="single"
          onGridReady={(event) => event.api.sizeColumnsToFit()}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <StrategySummary strategy={strategies[0]} />
        <StrategySummary strategy={strategies[1]} />
      </div>
    </div>
  )
}