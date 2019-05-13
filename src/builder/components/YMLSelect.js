import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter } from './utils';
import { YMLBase } from './YMLBase';

const allowedProps = [
    'name',
    'id',
    'multiple',
    'type',
    'bsSize',
    'state',
    'valid',
    'plaintext',
    'addon',
    'data-',
];

export class YMLSelectView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const id = `${obj.multiple ? 'multiple-' : ''}select-` + keyPath;
        const options =
            obj &&
            obj.options &&
            obj.options.map((option, index) => (
                <option key={`${keyPath}.${index}`} value={index}>
                    {option}
                </option>
            ));
        const assignProps = PropsFilter(this.props, allowedProps);
        const defaultProps = Object.assign(
            {},
            {
                type: 'select',
                id: id,
                name: id,
                keyPath,
            },
            assignProps
        );
        return (
            <FormGroup key={keyPath} row>
                <Col md="3">
                    <Label htmlFor={id}>{obj.label}</Label>
                </Col>
                <Col md="9">
                    <Input {...defaultProps}>{options}</Input>
                </Col>
            </FormGroup>
        );
    }
}
