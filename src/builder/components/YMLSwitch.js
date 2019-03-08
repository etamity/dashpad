import React, { Component } from 'react';
import { Label, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import { PropsFilter, EventsHook } from './utils';

const allowedProps = [
    'variant',
    'color',
    'disabled',
    'checked',
    'outline',
    'size',
    'dataOn',
    'dataOff',
    'data-'
];

const allowedEvents = ['onClick', 'onChange'];

export class YMLSwitchView extends Component {

    render() {
        const { name, keyPath, obj } = this.props;
        const uniqueKeyPath = `${keyPath}.${name}`;
        const assignProps = PropsFilter(this.props, allowedProps);
        const assignEvents = EventsHook(this.props, allowedEvents);
        return (
            <FormGroup key={uniqueKeyPath}>
                <InputGroup>
                    <AppSwitch {...assignProps} {...assignEvents}/>
                    <InputGroupAddon className="ml-2" addonType="append">
                        <Label htmlFor={uniqueKeyPath}>{obj.label} </Label>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        );
    }
}
