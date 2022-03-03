import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import StageGauge from '../../../components/gauges/StageGauge';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Gauges/Stage',
  component: StageGauge,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof StageGauge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof StageGauge> = (args) => <StageGauge {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  // primary: true,
  // label: 'Button',
};
