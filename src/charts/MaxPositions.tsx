import ReactECharts from 'echarts-for-react';
import { useDates } from '../hooks/useDates';
import { ChartProps, useSeries } from './pnl';

export const MaxPositionsChart = ({ strategies }: ChartProps) => {
  const dates = useDates();

  const options = {
    xAxis: {
      type: 'category',
      data: dates,
    },
    yAxis: [
      {
        type: 'value',
        name: "Delta Positions",
        axisLabel: {
          formatter: "{value}M",
        }
      },
      {
        type: 'value',
        name: "Positions",
        axisLabel: {
          formatter: "{value}M"
        }
      }],
    series: [
      {
        name: "Max Sum Long/Short Pos",
        data: useSeries(strategies, 'max_abs'),
        type: 'bar',
        color: "lightblue",
        yAxisIndex: 0,
      },
      {
        name: "Nb Long",
        data: useSeries(strategies, 'nb_long'),
        type: 'line',
        color: 'orange',
        yAxisIndex: 1,
      },
      {
        name: "Nb Short",
        data: useSeries(strategies, 'nb_short'),
        type: 'line',
        color: 'green',
        yAxisIndex: 1,
      }
    ],
    tooltip: {
      trigger: 'axis',
    },
    title: {
      text: "Long/Short - Futures"
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ["Max Sum Long/Short Pos", "Nb Long", "Nb Short"]
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
      },
      {
        type: 'inside',
        realtime: true
      }
    ]
  };

  return <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />;
}
