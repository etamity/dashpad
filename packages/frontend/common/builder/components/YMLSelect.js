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
    constructor(props) {
        super(props);
        const { obj } = props;
        this.state = {
            value: obj.value || obj.defaultValue,
        }
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    componentWillReceiveProps(props) {
        const { obj } = props;
        this.setState ({
            value: obj.value || obj.defaultValue,
        });
    }
    onBlur(e) {
        // eslint-disable-next-line no-new-wrappers
        const newValue =this.state.value;
        const { keyPath } = this.props;
        const _varsPath = keyPath.substring(keyPath.indexOf('.'), keyPath.length) + '.value';
        const _varsKey =
            VarsKeyStore[
                _varsPath
            ];
        const keyPathPropkey = `${keyPath}.value`;
        AppAction.updateUIState({
            keyPath: keyPathPropkey,
            value: newValue,
        });
        if (_varsKey) {
            const keyPathVars = `$vars.${_varsKey}`;
            AppAction.updateUIState({
                keyPath: keyPathVars,
                value: newValue,
            });
        }
    }
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
        const defaultProps = {
            type: 'select',
            id: id,
            name: id,
            keyPath,
            ...obj,
        };

        const mergedProps = { ...this.props, obj: defaultProps };
        const assignProps = PropsFilter(mergedProps, allowedProps);
        const assignEvents = EventsHook(mergedProps, allowedEvents);

        return (
            <FormGroup key={keyPath} row>
                <Col md="3">
                    <Label htmlFor={id}>{obj.label}</Label>
                </Col>
                <Col md="9">
                    <Input {...assignProps} 
                    {...assignEvents} 
                    onChange={this.onChange}
                    onBlur={this.onBlur}>
                        {options}
                    </Input>
                </Col>
            </FormGroup>
        );
    }
}
