import ReactECharts from 'echarts-for-react';

const StageGauge = () => {
  const options = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        axisLabel: {
          color: 'auto',
          distance: 40,
          fontSize: 10,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} km/h',
          color: 'auto',
          fontSize: 12,
        },
        data: [
          {
            value: 70,
          },
        ],
      },
    ],
  };

  // setInterval(function () {
  //   myChart.setOption<echarts.EChartsOption>({
  //     series: [
  //       {
  //         data: [
  //           {
  //             value: +(Math.random() * 100).toFixed(2)
  //           }
  //         ]
  //       }
  //     ]
  //   });
  // }, 2000);

  return <ReactECharts option={options} />;
};

export default StageGauge;
