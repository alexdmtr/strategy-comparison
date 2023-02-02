import { useState } from "react";


function randomNumVal(lowerBound: number, upperBound: number) {
  return lowerBound + Math.random() * (upperBound - lowerBound);
}

export type Strategy = ReturnType<typeof useStrategies>[number];

export function useStrategies() {
  const [rowData] = useState(() => {
    let data = [];
    for (let i = 1; i <= 26; i++) {
      data.push({
        "desk_name": `Desk${i}`,
        "name": `Strategy ${String.fromCharCode('A'.charCodeAt(0) + i)}`,
        "1y_sharpe": randomNumVal(0.5, 3.5),
        "1y_pnl": randomNumVal(-100, 500),
        "1y_stddev_pnl": randomNumVal(10, 20),
        "1y_net_pnl": randomNumVal(200, 300),
        "pnl": Array.from({ length: 7 }).map(() => randomNumVal(-150, 100)),
        "turnover": Array.from({ length: 7 }).map(() => randomNumVal(0, 7))
      })
    }

    return data;
  });

  return rowData;
}