import ReactECharts from 'echarts-for-react';
import { useDates } from '../hooks/useDates';
import { useTheme } from '../hooks/useTheme';
import { ChartProps, useSeries } from './pnl';

export const MaxPositionsChart = ({ strategies }: ChartProps) => {
  const dates = useDates();
  const [theme] = useTheme();

  const options = {
    xAxis: {
      type: 'category',
      data: dates,
    },
    yAxis: [
      {
        type: 'value',
        name: "Max Abs Position",
        axisLabel: {
          formatter: "{value}M",
        },
        nameLocation: "middle",
        nameGap: 40
      },
      {
        type: 'value',
        name: "Nb Positions",
        axisLabel: {
          formatter: "{value}M"
        },
        nameLocation: "middle",
        nameGap: 40
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
      data: ["Max Sum Long/Short Pos", "Nb Long", "Nb Short"],
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

  return <ReactECharts option={options} theme={theme} style={{ flex: 1 }} />;
}
