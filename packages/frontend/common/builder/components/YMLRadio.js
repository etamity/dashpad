import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter, EventsHook } from './utils';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';
import { SchemaKeys } from 'common/reducers/Constants'
import { AppAction } from 'common/reducers/app';
import { VarsKeyStore } from './ValueResovler';

const allowedProps = [
    'name',
    'id',
    'type',
    'bsSize',
    'state',
    'valid',
    'plaintext',
    'addon',
    'value',
    'data-',
];
const allowedEvents = [UIEvent.ON_CLICK, UIEvent.ON_CHANGE];

export class YMLRadioView extends YMLBase {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        const { value } = e.target;
        const { keyPath } = this.props;
        const _varsPath = keyPath.substring(keyPath.indexOf('.'), keyPath.length) + '.value';
        const _varsKey =
            VarsKeyStore[
                _varsPath
            ];
        if (_varsKey) {
            const keyPathVars = `${SchemaKeys.VARS}.${_varsKey}`;
            AppAction.updateUIState({
                keyPath: keyPathVars,
                value,
            });
        } else {
            const keyPathPropkey = `${keyPath}.value`;
            AppAction.updateUIState({
                keyPath: keyPathPropkey,
                value,
            });
        }
    }

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
                const value = option.value ? option.value : option;
                const label = option.label ? option.label : option;
                return (
                    <FormGroup key={idkey} check inline={obj.inline}>
                        <Input {...assignProps} {...assignEvents} 
                        checked={String(obj.value) === String(value)} 
                        onChange={this.onChange}
                        value={value}
                        />
                        <Label check htmlFor={idkey}>
                            {label}
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
