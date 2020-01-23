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
    componentWillReceiveProps(props) {
        const { obj } = props;
        this.setState ({
            value: obj.value || obj.defaultValue,
        });
    }
    onChange(e) {
        const newValue = e.target.value;
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
                value: newValue,
            });
        } else {
            const keyPathPropkey = `${keyPath}.value`;
            AppAction.updateUIState({
                keyPath: keyPathPropkey,
                value: newValue,
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
                return (
                    <FormGroup key={idkey} check inline={obj.inline}>
                        <Input {...assignProps} {...assignEvents} 
                        checked={String(obj.value) === String(option)} 
                        onChange={this.onChange}
                        value={option}
                        />
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
