import Battery from './Battery.svelte';

export default {
    title: 'HopCity/Battery',
    component: Battery,
    excludeStories: /.*Data$/,
};

const Template = ({ ...args }) => ({
    Component: Battery,
    props: args,
});

export const Default = Template.bind({});
Default.args = {
    value: 89,
};

export const Medium = Template.bind({});
Medium.args = {
    value: 43,
};

export const Low = Template.bind({});
Low.args = {
    value: 12,
};

