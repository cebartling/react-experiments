import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SimpleChart from '../../../components/charts/SimpleChart';
import RadarChart from '../../../components/charts/RadarChart';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Charts/Radar',
  component: RadarChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof RadarChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof RadarChart> = (args) => <RadarChart {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  // primary: true,
  // label: 'Button',
};
