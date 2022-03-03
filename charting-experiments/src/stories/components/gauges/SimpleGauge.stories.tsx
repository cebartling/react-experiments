import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SimpleGauge from '../../../components/gauges/SimpleGauge';
``;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Gauges/Simple',
  component: SimpleGauge,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof SimpleGauge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof SimpleGauge> = (args) => <SimpleGauge {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  // primary: true,
  // label: 'Button',
};
