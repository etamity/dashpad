import React from 'react';
import { Progress, FormGroup } from 'reactstrap';
import _ from 'lodash';
import { PropsFilter } from './utils';
import { YMLBase } from './YMLBase';

const allowedProps = [
    'value',
    'color',
    'animated',
    'bar',
    'striped',
    'max',
    'data-',
];

export class YMLProgressView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const assignProps = PropsFilter(this.props, allowedProps);
        return (
            <FormGroup key={keyPath}>
                <Progress {...assignProps}>
                    {_.isBoolean(obj.label) && (
                        <span>{obj.value + ' / ' + obj.max}</span>
                    )}
                    {_.isString(obj.label) && obj.label}
                </Progress>
            </FormGroup>
        );
    }
}
