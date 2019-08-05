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

export class YMLCheckboxView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;

        const options =
            obj &&
            obj.options &&
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

                const mergedProps = Object.assign({}, this.props, {
                    obj: defaultProps
                });
                const assignProps = PropsFilter(mergedProps,  allowedProps);
                const assignEvents = EventsHook(mergedProps, allowedEvents);
                return (
                    <FormGroup key={idkey} check inline={obj.inline}>
                        <Input {...assignProps} {...assignEvents} />
                        <Label check htmlFor={id}>
                            {option}
                        </Label>
                    </FormGroup>
                );
            });

        return (
            <FormGroup row>
                <Col md="3">
                    <Label>{obj.label}</Label>
                </Col>
                <Col md="9">{options}</Col>
            </FormGroup>
        );
    }
}
