import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter, EventsHook } from './utils';
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
const allowedEvents = ['onClick'];

export class YMLCheckboxView extends YMLBase {
 
    render() {
        const { keyPath, obj } = this.props;

        const options =
            obj && obj.options &&
            obj.options.map((option, index) => {
                const idkey = keyPath + index;
                const id = 'nf-checkbox-' + index;
                const defaultProps = Object.assign(
                    {},
                    {
                        type: 'checkbox',
                        id: id,
                        name: id,
                        keyPath,
                    },
                    obj
                );
                const assignProps = PropsFilter(defaultProps, allowedProps);
                const assignEvents = EventsHook(this.props, allowedEvents);
                return (
                    <FormGroup key={idkey} check inline={obj.inline}>
                        <Input
                            {...assignProps}
                            {...assignEvents}
                        />
                        <Label check htmlFor={id}>
                            {option}
                        </Label>
                    </FormGroup>
                );
            });

        return (
            <FormGroup row>
                <Col md="3">
                    <Label>{obj.title}</Label>
                </Col>
                <Col md="9">{options}</Col>
            </FormGroup>
        );
    }
}
