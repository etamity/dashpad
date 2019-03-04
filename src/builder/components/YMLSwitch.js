import React, { Component } from 'react';
import { Label, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import { PropsFilter } from './utils';

const allowedProps = [
    'variant',
    'color',
    'disabled',
    'checked',
    'outline',
    'size',
    'dataOn',
    'dataOff',
];

export class YMLSwitchView extends Component {
    render() {
        const { name, keyPath, obj } = this.props;
        const uniqueKeyPath = `${keyPath}.${name}`;
        return (
            <FormGroup key={uniqueKeyPath}>
                <InputGroup>
                    <AppSwitch {...PropsFilter(obj, allowedProps)} />
                    <InputGroupAddon className="ml-2" addonType="append">
                        <Label htmlFor={uniqueKeyPath}>{obj.label} </Label>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        );
    }
}
