import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter, EventsHook } from './utils';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';
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
const allowedEvents = [UIEvent.ON_CLICK, UIEvent.ON_CHANGE];
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
        const defaultProps = Object.assign(
            {},
            {
                type: 'select',
                id: id,
                name: id,
                keyPath,
            },
            obj
        );

        const mergedProps = Object.assign({}, this.props, {
            obj: defaultProps
        });
        const assignProps = PropsFilter(mergedProps,  allowedProps);
        const assignEvents = EventsHook(mergedProps, allowedEvents);

        return (
            <FormGroup key={keyPath} row>
                <Col md="3">
                    <Label htmlFor={id}>{obj.label}</Label>
                </Col>
                <Col md="9">
                    <Input {...assignProps} {...assignEvents}>{options}</Input>
                </Col>
            </FormGroup>
        );
    }
}