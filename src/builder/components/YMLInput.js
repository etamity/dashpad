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
import { InputType, InputAddonType } from './Constants';
import { YMLButtonView } from './YMLButton';
import { PropsFilter, EventsHook } from './utils';

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
    'value',
    'defaultValue',
    'data-',
    'className'
];

const allowedEvents = ['onClick', 'onChange'];

export class YMLInputView extends Component {

    render() {
        const { keyPath, obj } = this.props;
        let defaultProps;
        switch (obj.type.toUpperCase()) {
            case InputType.TEXT:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'text',
                        id: 'text-input' + keyPath,
                        name: 'text-input' + keyPath,
                        tooltip: 'Please enter text',
                    }
                );
                break;
            case InputType.TEXTAREA:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'text',
                        id: 'textarea-input' + keyPath,
                        name: 'textarea-input' + keyPath,
                        tooltip: 'Please enter description',
                        rows: 9,
                    }
                );
                break;
            case InputType.NUMBER:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'number',
                        id: 'number-input' + keyPath,
                        name: 'number-input' + keyPath,
                        tooltip: 'Please enter number',
                    }
                );

                break;
            case InputType.DATE:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'date',
                        id: 'date-input' + keyPath,
                        name: 'date-input' + keyPath,
                        tooltip: 'Please enter date',
                    }
                );

                break;
            case InputType.DATETIME:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'datetime',
                        id: 'datetime-input' + keyPath,
                        name: 'datetime-input' + keyPath,
                        tooltip: 'Please enter date time',
                    }
                );

                break;
            case InputType.TIME:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'time',
                        id: 'time-input' + keyPath,
                        name: 'time-input' + keyPath,
                        tooltip: 'Please enter time',
                    }
                );

                break;
            case InputType.FILE:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'file',
                        id: 'file-input' + keyPath,
                        name: 'file-input' + keyPath,
                        tooltip: 'Please choose file',
                    }
                );

                break;
            case InputType.PASSWORD:
                defaultProps = Object.assign(
                    {},
                    {
                        type: 'password',
                        id: 'nf-password' + keyPath,
                        name: 'nf-password' + keyPath,
                        placeholder: 'Enter Password..',
                        autoComplete: 'current-password',
                        tooltip: 'Please enter your password',
                    }
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
                    }
                );

                break;

            default:
                return null;
        }

        defaultProps = Object.assign({}, defaultProps, PropsFilter(obj ,allowedProps));
        const assignEvents = EventsHook(this.props, allowedEvents);
        return (
            <FormGroup>
                <Label htmlFor={defaultProps.id}>{obj.label}</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        {obj.prepend && <YMLInputGroupView obj={obj.prepend} />}
                    </InputGroupAddon>
                    < Input
                        {...defaultProps}
                        {...assignEvents}    
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
