import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SimpleChart from '../../../components/charts/SimpleChart';
import DynamicUpdatingChart from '../../../components/charts/DynamicUpdatingChart';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Charts/Dynamic Updating',
  component: DynamicUpdatingChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof DynamicUpdatingChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof DynamicUpdatingChart> = (args) => (
  <DynamicUpdatingChart {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  // primary: true,
  // label: 'Button',
};
