import React from 'react';
import ReactECharts from 'echarts-for-react';
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn,
} from 'echarts';
import { OpenHighLowCloseChartProps } from "../../vite-env";

function renderItem(
  params: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
): CustomSeriesRenderItemReturn {
  const xValue = api.value(0);
  const openPoint = api.coord([xValue, api.value(1)]);
  const closePoint = api.coord([xValue, api.value(2)]);
  const lowPoint = api.coord([xValue, api.value(3)]);
  const highPoint = api.coord([xValue, api.value(4)]);
  const halfWidth = (api.size!([1, 0]) as number[])[0] * 0.35;
  const style = api.style({
    stroke: api.visual('color'),
  });

  return {
    type: 'group',
    children: [
      {
        type: 'line',
        shape: {
          x1: lowPoint[0],
          y1: lowPoint[1],
          x2: highPoint[0],
          y2: highPoint[1],
        },
        style: style,
      },
      {
        type: 'line',
        shape: {
          x1: openPoint[0],
          y1: openPoint[1],
          x2: openPoint[0] - halfWidth,
          y2: openPoint[1],
        },
        style: style,
      },
      {
        type: 'line',
        shape: {
          x1: closePoint[0],
          y1: closePoint[1],
          x2: closePoint[0] + halfWidth,
          y2: closePoint[1],
        },
        style: style,
      },
    ],
  };
}


const OpenHighLowCloseChart = ({ categoryData, values }: OpenHighLowCloseChartProps) => {
  const option = {
    animation: false,
    legend: {
      bottom: 10,
      left: 'center',
      data: ['Dow-Jones index'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      position: function (pos: any[], params: any, el: any, elRect: any, size: any) {
        var obj: Record<string, number> = { top: 10 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
    },
    axisPointer: {
      link: [{ xAxisIndex: 'all' }],
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        brush: {
          type: ['lineX', 'clear'],
        },
      },
    },
    grid: [
      {
        left: '10%',
        right: '8%',
        bottom: 150,
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100,
        },
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 98,
        end: 100,
        minValueSpan: 10,
      },
      {
        show: true,
        type: 'slider',
        bottom: 60,
        start: 98,
        end: 100,
        minValueSpan: 10,
      },
    ],
    series: [
      {
        name: 'Dow-Jones index',
        type: 'custom',
        renderItem: renderItem,
        dimensions: ['-', 'open', 'close', 'lowest', 'highest'],
        encode: {
          x: 0,
          y: [1, 2, 3, 4],
          tooltip: [1, 2, 3, 4],
        },
        data: values,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 500 }} />;
};

export default OpenHighLowCloseChart;
