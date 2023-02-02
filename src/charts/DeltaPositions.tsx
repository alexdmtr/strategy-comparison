import ReactECharts from 'echarts-for-react';
import { useDates } from '../hooks/useDates';
import { ChartProps, useSeries } from './pnl';

export const DeltaPositionsChart = ({ strategies }: ChartProps) => {
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
        name: "Sum Long Positions",
        data: useSeries(strategies, 'sum_long_positions'),
        type: 'line',
        color: "blue",
        yAxisIndex: 1,
      },
      {
        name: "Sum Abs Short Positions",
        data: useSeries(strategies, 'sum_abs_short_positions'),
        type: 'line',
        color: 'orange',
        yAxisIndex: 1,
      },
      {
        name: "Delta Long Short Positions",
        data: useSeries(strategies, 'delta_long_short_positions'),
        type: 'bar',
        color: 'green',
        yAxisIndex: 0,
      }
    ],
    tooltip: {
      trigger: 'axis',
    },
    title: {
      text: "Sum Positions - Futures"
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
      data: ["Sum Long Positions", "Sum Abs Short Positions", "Delta Long Short Positions"]
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
