import React, { Component } from 'react';
import {
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    CustomInput
} from 'reactstrap';
import { AppAction } from 'reducers/app';
import { InputType, InputAddonType } from './Constants';
import { YMLButtonView } from './YMLButton';
import Context from '../context';

export class YMLInputGroupView extends Component {
    render() {
        const { obj } = this.props;
        return obj.map(item => {
            let field = null;

            switch (item.type.toUpperCase()) {
                case InputAddonType.BUTTON:
                    field = (
                        <YMLButtonView key={item.type} obj={item}>
                            {item.icon && <i className={item.icon} />}{' '}
                            {item.label}
                        </YMLButtonView>
                    );
                    break;
                case InputAddonType.TEXT:
                    field = (
                        <InputGroupText key={item.type}>
                            {item.icon && <i className={item.icon} />}
                            {item.label}
                        </InputGroupText>
                    );
                    break;
                default:
                    return null;
            }
            return field;
        });
    }
}

const allowedProps = [
    'bgSize',
    'type',
    'size',
    'valid',
    'invalid',
    'placeholder',
    'disabled',
    'variant',
    'divider',
    'data-',
];

export class YMLInputView extends Component {
    static contextType = Context;

    render() {
        const { keyPath, obj } = this.props;
        let defaultProps;
        const idkey = `-${keyPath}`;
        switch (obj.type.toUpperCase()) {
            case InputType.TEXT:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'text',
                        id: 'text-input' + idkey,
                        name: 'text-input' + idkey,
                        tooltip: 'Please enter text',
                    },
                    obj
                );
                break;
            case InputType.TEXTAREA:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'text',
                        id: 'textarea-input' + idkey,
                        name: 'textarea-input' + idkey,
                        tooltip: 'Please enter description',
                        rows: 9,
                    },
                    obj
                );
                break;
            case InputType.NUMBER:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'number',
                        id: 'number-input' + idkey,
                        name: 'number-input' + idkey,
                        tooltip: 'Please enter number',
                    },
                    obj,
                    { value: this.props.value }
                );

                break;
            case InputType.DATE:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'date',
                        id: 'date-input' + idkey,
                        name: 'date-input' + idkey,
                        tooltip: 'Please enter date',
                    },
                    obj
                );

                break;
            case InputType.DATETIME:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'datetime',
                        id: 'datetime-input' + idkey,
                        name: 'datetime-input' + idkey,
                        tooltip: 'Please enter date time',
                    },
                    obj
                );

                break;
            case InputType.TIME:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'time',
                        id: 'time-input' + idkey,
                        name: 'time-input' + idkey,
                        tooltip: 'Please enter time',
                    },
                    obj
                );

                break;
            case InputType.FILE:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'file',
                        id: 'file-input' + idkey,
                        name: 'file-input' + idkey,
                        tooltip: 'Please choose file',
                    },
                    obj
                );

                break;
            case InputType.PASSWORD:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'password',
                        id: 'nf-password' + idkey,
                        name: 'nf-password' + idkey,
                        placeholder: 'Enter Password..',
                        autoComplete: 'current-password',
                        tooltip: 'Please enter your password',
                    },
                    obj
                );

                break;
            case InputType.EMAIL:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'email',
                        id: 'nf-email',
                        name: 'nf-email',
                        placeholder: 'Enter Email..',
                        autoComplete: 'email',
                        tooltip: 'Please enter your email',
                    },
                    obj
                );

                break;

            default:
                return null;
        }

        
        return (
            <FormGroup>
                <Label htmlFor={defaultProps.id}>{obj.label}</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        {obj.prepend && <YMLInputGroupView obj={obj.prepend} />}
                    </InputGroupAddon>
                    < Input
                        {...defaultProps}
                        onChange={e => {
                            AppAction.updateUIState({
                                keyPath: keyPath + '.value',
                                value: e.target.value,
                            });
                            obj.onChange &&
                                this.context.vm.run(obj.onChange, {
                                    props: obj,
                                    e,
                                });
                        }}
                        onClick={e => {
                            obj.onClick &&
                                this.context.vm.run(obj.onClick, {
                                    props: obj,
                                    e,
                                });
                        }}
                    />
                    <InputGroupAddon addonType="append">
                        {obj.append && <YMLInputGroupView obj={obj.append} />}
                    </InputGroupAddon>
                </InputGroup>
                <FormText className="help-block">
                    {defaultProps.tooltip}
                </FormText>
            </FormGroup>
        );
    }
}
