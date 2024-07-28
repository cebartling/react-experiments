import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ProfileForm from '../../../components/profile-form/ProfileForm';

export default {
  title: 'Forms/Profile',
  component: ProfileForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as ComponentMeta<typeof ProfileForm>;

// @ts-ignore
const Template: ComponentStory<typeof ProfileForm> = (args) => <ProfileForm {...args} />;

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//     user: {
//         name: 'Jane Doe',
//     },
// };

export const Default = Template.bind({});
Default.args = {};
