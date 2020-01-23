import React, { Component } from 'react';
import block from './chainBlock';
import { Dashpad } from 'common/store';
class Block extends Component {
    render() {
        const { setState, state, defaultState } = this.props;
        const mergedState = { ...defaultState, ...state, set: setState };
        return (
            <div style={this.props.style}>
                {this.props.children && this.props.children(mergedState)}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        state: state.app.uiSchema,
    };
};

const mergeProps = (stateProps, _, ownProps) => ({
    ...ownProps,
    setState: value => {
        Dashpad.setState(ownProps.name, value);
    },
    state:
        ownProps.name && stateProps.state
            ? stateProps.state[ownProps.name]
            : stateProps.state,
});

export default block(Block)
    .connect(mapStateToProps, null, mergeProps)
    .getComponent();
