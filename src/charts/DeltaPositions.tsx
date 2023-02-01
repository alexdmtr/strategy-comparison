import ReactECharts from 'echarts-for-react';

export const DeltaPositionsChart = () => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    title: {
      text: "Sum Position - Futures - Delta mode: AllInstruments"
    }
  };

  return <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />;
}
