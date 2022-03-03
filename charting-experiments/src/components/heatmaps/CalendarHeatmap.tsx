import ReactECharts from 'echarts-for-react';
import {format} from "date-fns";

function getVirtualData(year: string) {
  year = year || '2021';
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = startDate.getTime(); time <= endDate.getTime(); time += dayTime) {
    let currentDate = new Date(time);
    data.push([
      format(currentDate, 'yyyy-MM-dd'),
      Math.floor(Math.random() * 10000)
    ]);
  }
  return data;
}

const CalendarHeatmap = () => {
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 10000
    },
    calendar: {
      range: '2021'
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData('2021')
    }
  };

  return (<ReactECharts option={options}/>);
};

export default CalendarHeatmap;




