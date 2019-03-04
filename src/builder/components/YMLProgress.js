import React, {Component} from 'react';
import { Progress } from 'reactstrap';
import _ from 'lodash';
import { PropsFilter } from './utils';

const allowedProps = ['value', 'color', 'animated', 'bar', 'striped', 'max'];

export class YMLProgressView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <Progress
                key={keyPath}
                {...PropsFilter(obj, allowedProps)}
            >
                {_.isBoolean(obj.label) && <span>{obj.value + ' / ' + obj.max}</span>}
                {_.isString(obj.label) && obj.label}
            
            </Progress>
        );
    }
};
