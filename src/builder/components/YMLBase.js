import React from 'react';
import _ from 'lodash';
import VM from 'libs/VM';
import Context from './context';

export class YMLBase extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props, nextProps);
    }
    componentWillMount() {
        const { obj } = this.props;
        obj && obj.onWillMount && VM.run(obj.onWillMount, Context(this.props));
    }
    componentDidMount() {
        const { obj } = this.props;
        obj && obj.onMount && VM.run(obj.onMount, Context(this.props));
    }
}
