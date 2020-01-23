import Block from './core/Block';

const Component = ({ children }) => {
    return new children();
};
export default {
    Component,
    Block
}