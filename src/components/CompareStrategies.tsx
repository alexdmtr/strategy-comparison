import { DeltaPositionsChart } from "../charts/DeltaPositions";
import { MaxPositionsChart } from "../charts/MaxPositions";
import { PnlChart } from "../charts/pnl";
import { Strategy } from "../hooks/useStrategies";

interface StrategySummaryProps {
  strategy: Strategy;
}

const StrategySummary = ({ strategy }: StrategySummaryProps) => {
  return (
    <div style={{ flex: 1, flexDirection: "column" }}>
      <h4 className="bp4-heading">{strategy.name}</h4>
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
  if (strategies.length !== 2) {
    return null;
  }

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "row" }}>
      <StrategySummary strategy={strategies[0]} />
      <StrategySummary strategy={strategies[1]} />
    </div>
  )
}