import React from 'react';
import _ from 'lodash';
import VM from 'libs/VM';

export class YMLBase extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(this.props, nextProps);
    }
    componentWillMount() {
        const { obj, type, keyPath, name } = this.props;
        obj &&
            obj.onWillMount &&
            VM.run(obj.onWillMount, {
                props: {
                    obj,
                    type,
                    keyPath,
                    name,
                },
            });
    }
    componentDidMount() {
        const { obj, type, keyPath, name } = this.props;
        obj &&
            obj.onMount &&
            VM.run(obj.onMount, {
                props: {
                    obj,
                    type,
                    keyPath,
                    name,
                },
            });
    }
}
