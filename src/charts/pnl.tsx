import ReactECharts from 'echarts-for-react';
import { Strategy } from '../hooks/useStrategies';

export interface ChartProps {
  strategies: Strategy[];
}

export const PnlChart = ({ strategies }: ChartProps) => {
  const options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: [{
      type: 'value',
      name: "Turnover",
      position: "left",
      axisLabel: {
        formatter: "{value} M",
      }
    }, {
      type: 'value',
      name: "Pnl",
      position: "right",
      axisLabel: {
        formatter: "{value}k"
      }
    }],
    series: [
      {
        name: "Turnover",
        data: Array.from({ length: 7 }).map((_, i) => i).map(x => strategies.reduce((sum, strategy) => sum + strategy.turnover[x], 0)),
        type: 'bar',
      },
      {
        name: "Pnl",
        data: Array.from({ length: 7 }).map((_, i) => i).map(x => strategies.reduce((sum, strategy) => sum + strategy.pnl[x], 0)),
        type: 'line',
        yAxisIndex: 1,
      }
    ],
    tooltip: {
      trigger: 'axis',
    },
    title: {
      text: "Pnl / T0"
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
  };

  return (
    <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />
  );
}
