import ReactECharts from 'echarts-for-react';
import { useDates } from '../hooks/useDates';
import { Strategy } from '../hooks/useStrategies';
import { useTheme } from '../hooks/useTheme';

export interface ChartProps {
  strategies: Strategy[];
}

export function useSeries(strategies: Strategy[], field: keyof Pick<Strategy, 'turnover' | 'pnl' | 'sum_long_positions' | 'sum_abs_short_positions' | 'delta_long_short_positions' | 'max_abs' | 'nb_long' | 'nb_short'>) {
  const dates = useDates();

  return dates.map((_, i) => i).map(x => strategies.reduce((sum, strategy) => sum + strategy[field][x], 0))
}
export const PnlChart = ({ strategies }: ChartProps) => {
  const dates = useDates();
  const [theme] = useTheme();

  const options = {
    xAxis: {
      type: 'category',
      data: dates,
    },
    yAxis: [{
      type: 'value',
      name: "Turnover",
      axisLabel: {
        formatter: "{value} M",
      },
      nameLocation: "middle",
      nameGap: 40
    }, {
      type: 'value',
      name: "Pnl",
      position: "right",
      axisLabel: {
        formatter: "{value}k"
      },
      nameLocation: "middle",
      nameGap: 40
    }],
    series: [
      {
        name: "Turnover",
        data: useSeries(strategies, 'turnover'),
        type: 'bar',
        color: "grey",
      },
      {
        name: "Pnl",
        data: useSeries(strategies, 'pnl'),
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
      data: ["Turnover", "Pnl"],
      top: 25
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

  return (
    <ReactECharts option={options} theme={theme} style={{ flex: 1 }} />
  );
}
