import React from 'react';
import ReactECharts from 'echarts-for-react';

const AnotherSimpleChart = () => {
  const option = {
    title: {
      text: 'Another Simple Chart Title'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Rocks', 'Paper', 'Scissors']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['one', 'two', 'three', 'four', 'five', 'six', 'sever']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Series 1',
        type: 'line',
        stack: 'stack',
        areaStyle: {normal: {}},
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Series 2',
        type: 'line',
        stack: 'stack',
        areaStyle: {normal: {}},
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Series 3',
        type: 'line',
        stack: 'stack',
        areaStyle: {normal: {}},
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{height: 400}}
    />
  );
};

export default AnotherSimpleChart;
