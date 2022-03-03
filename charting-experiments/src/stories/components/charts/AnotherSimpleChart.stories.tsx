import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import SimpleChart from "../../../components/charts/SimpleChart";
import AnotherSimpleChart from "../../../components/charts/AnotherSimpleChart";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Charts/Another Simple',
  component: AnotherSimpleChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof AnotherSimpleChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof AnotherSimpleChart> = (args) => <AnotherSimpleChart {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  // primary: true,
  // label: 'Button',
};

