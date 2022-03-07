import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import CheckoutForm from '../../../components/checkout-form/CheckoutForm';

export default {
    title: 'Forms/Checkout',
    component: CheckoutForm,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
        docs: {
            source: {
                type: 'code',
            },
        },
    },
} as ComponentMeta<typeof CheckoutForm>;

// @ts-ignore
const Template: ComponentStory<typeof CheckoutForm> = (args) => <CheckoutForm {...args} />;

// export const LoggedIn = Template.bind({});
// LoggedIn.args = {
//     user: {
//         name: 'Jane Doe',
//     },
// };

export const Default = Template.bind({});
Default.args = {};
