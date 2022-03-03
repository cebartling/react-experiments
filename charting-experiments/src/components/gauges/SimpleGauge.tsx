import ReactECharts from 'echarts-for-react';

const SimpleGauge = () => {
  const options = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ]
  };


  return (<ReactECharts option={options} />);
};

export default SimpleGauge;
