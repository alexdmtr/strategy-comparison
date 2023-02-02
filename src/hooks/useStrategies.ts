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

function randomSeries(length: number, generator: () => number) {
  return Array.from({ length }).map(() => generator());
}

export function useStrategies() {
  const dates = useDates();
  const [turnoverNormal] = useState(() => random.normal(3.5, 1));
  const [sumLongNormal] = useState(() => random.normal(4 / 2, 0.5));
  const [sumAbsNormal] = useState(() => random.normal(5 / 2, 0.5));
  const [deltaNormal] = useState(() => random.normal(0, 0.25));
  const [maxAbsNormal] = useState(() => random.normal(2.5, 1));

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
        "pnl": randomWalk(dates.length),
        "turnover": randomSeries(dates.length, turnoverNormal),
        "sum_long_positions": randomSeries(dates.length, sumLongNormal),
        "sum_abs_short_positions": randomSeries(dates.length, sumAbsNormal),
        "delta_long_short_positions": randomSeries(dates.length, deltaNormal),
        "max_abs": randomSeries(dates.length, maxAbsNormal),
        "nb_long": randomSeries(dates.length, () => random.float(0, 1)),
        "nb_short": randomSeries(dates.length, () => random.float(0, 1))
      })
    }

    return data;
  });

  return rowData;
}