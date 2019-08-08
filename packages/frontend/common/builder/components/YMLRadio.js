import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter, EventsHook } from './utils';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';
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
const allowedEvents = [UIEvent.ON_CLICK, UIEvent.ON_CHANGE];

export class YMLRadioView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const options =
            obj &&
            obj.options &&
            obj.options.map((option, index) => {
                const idkey = `${keyPath}.${index}`;
                const defaultProps = {
                    type: 'radio',
                    id: idkey,
                    name: keyPath,
                    keyPath,
                    ...obj,
                };
                const mergedProps = { ...this.props, obj: defaultProps };
                const assignProps = PropsFilter(mergedProps, allowedProps);
                const assignEvents = EventsHook(mergedProps, allowedEvents);
                return (
                    <FormGroup key={idkey} check inline={obj.inline}>
                        <Input {...assignProps} {...assignEvents} />
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
