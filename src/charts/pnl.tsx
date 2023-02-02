import ReactECharts from 'echarts-for-react';
import { useDates } from '../hooks/useDates';
import { Strategy } from '../hooks/useStrategies';

export interface ChartProps {
  strategies: Strategy[];
}

export const PnlChart = ({ strategies }: ChartProps) => {
  const dates = useDates();

  const options = {
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        formatter: (value: string) => new Date(value).toLocaleDateString("en-US"),
      }
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
        data: dates.map((_, i) => i).map(x => strategies.reduce((sum, strategy) => sum + strategy.turnover[x], 0)),
        type: 'bar',
        color: "grey",
      },
      {
        name: "Pnl",
        data: dates.map((_, i) => i).map(x => strategies.reduce((sum, strategy) => sum + strategy.pnl[x], 0)),
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
    legend: {
      data: ["Turnover", "Pnl"]
    }
  };

  return (
    <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />
  );
}
