import random from "random";
import { useState } from "react";
import { useDates } from "./useDates";


function randomNumVal(lowerBound: number, upperBound: number) {
  return lowerBound + Math.random() * (upperBound - lowerBound);
}

export type Strategy = ReturnType<typeof useStrategies>[number];

function randomWalk(length: number) {
  let walk = [];
  let cursor = 0;
  for (let i = 0; i < length; i++) {
    cursor += randomNumVal(-1.5, 1.5);
    walk.push(cursor);
  }

  return walk;
}

export function useStrategies() {
  const dates = useDates();
  const [normal] = useState(() => random.normal(3.5, 1));
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
        // "pnl": Array.from({ length: dates.length }).map(() => randomNumVal(-150, 100)),
        "pnl": randomWalk(dates.length),
        "turnover": Array.from({ length: dates.length }).map(() => normal())

        // turnover: randomWalk(dates.length),
      })
    }

    return data;
  });

  return rowData;
}