import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter } from './utils';
import { YMLBase } from './YMLBase';

const allowedProps = [
    'name',
    'id',
    'type',
    'bsSize',
    'state',
    'valid',
    'plaintext',
    'addon',
    'data-',
];

export class YMLRadioView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const options =
            obj &&
            obj.options &&
            obj.options.map((option, index) => {
                const idkey = `${keyPath}.${index}`;
                const assignProps = PropsFilter(this.props, allowedProps);
                const defaultProps = Object.assign(
                    {},
                    {
                        type: 'radio',
                        id: idkey,
                        name: keyPath,
                        keyPath,
                    },
                    assignProps
                );

                return (
                    <FormGroup key={idkey} check inline={obj.inline}>
                        <Input {...defaultProps} />
                        <Label check htmlFor={idkey}>
                            {option}
                        </Label>
                    </FormGroup>
                );
            });
        return (
            <FormGroup key={keyPath} row>
                <Col md="3">
                    <Label>{obj.label}</Label>
                </Col>
                <Col md="9">{options}</Col>
            </FormGroup>
        );
    }
}
