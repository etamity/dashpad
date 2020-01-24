import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';
import { PropsFilter, EventsHook } from './utils';
import { YMLBase } from './YMLBase';
import { UIEvent } from './Constants';
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
    'data-',
];
const allowedEvents = [UIEvent.ON_CLICK, UIEvent.ON_CHANGE];

export class YMLCheckboxView extends YMLBase {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        const { keyPath, obj } = this.props;
        const { value } = e.target.dataset;
        let newValue = obj.value ? [...obj.value] : [];
        if (newValue.includes(value)) {
            newValue = newValue.filter(val => val !== value);
        } else {
            newValue.push(value);
        }
        const _varsPath = keyPath.substring(keyPath.indexOf('.'), keyPath.length) + '.value';
        const _varsKey =
            VarsKeyStore[
                _varsPath
            ];
        if (_varsKey) {
            const keyPathVars = `$vars.${_varsKey}`;
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
                const idkey = keyPath + index;
                const id = 'nf-checkbox-' + index;
                const defaultProps = {
                    type: 'checkbox',
                    id: id,
                    name: id,
                    keyPath,
                    ...obj,
                    value: obj.value || []
                };

                const mergedProps = { ...this.props, obj: defaultProps };
                const assignProps = PropsFilter(mergedProps, allowedProps);
                const assignEvents = EventsHook(mergedProps, allowedEvents);
                return (
                    <FormGroup key={idkey} check inline={obj.inline}>
                        <Input {...assignProps} {...assignEvents}
                        data-value={option}
                        onChange={this.onChange}
                        checked={mergedProps.obj.value.includes(option)} />
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
