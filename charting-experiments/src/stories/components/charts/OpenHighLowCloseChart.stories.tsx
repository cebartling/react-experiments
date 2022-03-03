import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import OpenHighLowCloseChart from '../../../components/charts/OpenHighLowCloseChart';
import rawData from '../../data/stock-DJI';

function splitData(rawData: (string | number)[][]) {
  const categoryData = [];
  const values = [];
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i][0]);
    rawData[i][0] = i;
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values,
  };
}

const data = splitData(rawData);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Charts/Open-High-Low-Close',
  component: OpenHighLowCloseChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof OpenHighLowCloseChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof OpenHighLowCloseChart> = (args) => (
  <OpenHighLowCloseChart {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  categoryData: data.categoryData,
  values: data.values,
};
