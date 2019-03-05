import React, { Component } from 'react';
import { Label, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import { PropsFilter } from './utils';
import Context from '../context';

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

export class YMLSwitchView extends Component {
    static contextType = Context;
    render() {
        const { name, keyPath, obj } = this.props;
        const uniqueKeyPath = `${keyPath}.${name}`;
        return (
            <FormGroup key={uniqueKeyPath}>
                <InputGroup>
                    <AppSwitch {...PropsFilter(obj, allowedProps)} onClick={e => {
                    obj.onClick &&
                        this.context.vm.run(obj.onClick, {
                            props: obj,
                            e,
                        });
                }} />
                    <InputGroupAddon className="ml-2" addonType="append">
                        <Label htmlFor={uniqueKeyPath}>{obj.label} </Label>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        );
    }
}
