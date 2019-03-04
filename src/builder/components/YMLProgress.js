import React, {Component} from 'react';
import { Progress, FormGroup } from 'reactstrap';
import _ from 'lodash';
import { PropsFilter } from './utils';

const allowedProps = ['value', 'color', 'animated', 'bar', 'striped', 'max'];

export class YMLProgressView extends Component {
    render() {
        const { keyPath, obj } = this.props;
        return (<FormGroup key={keyPath}>
            <Progress
                {...PropsFilter(obj, allowedProps)}
            >
                {_.isBoolean(obj.label) && <span>{obj.value + ' / ' + obj.max}</span>}
                {_.isString(obj.label) && obj.label}
            
            </Progress></FormGroup>
        );
    }
};
