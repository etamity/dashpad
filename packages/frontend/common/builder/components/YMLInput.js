import React from 'react';
import {
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Button
} from 'reactstrap';
import { InputType, InputAddonType, UIEvent } from './Constants';
import { YMLButtonView } from './YMLButton';
import { PropsFilter, EventsHook } from './utils';
import { YMLBase } from './YMLBase';
import { AppAction } from 'common/reducers/app';
import { VarsKeyStore } from './ValueResovler';


export class YMLInputGroupView extends YMLBase {
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
    'accept',
    'bgSize',
    'type',
    'size',
    'rows',
    'valid',
    'invalid',
    'placeholder',
    'disabled',
    'variant',
    'data-',
    'className',
    'tooltip',
];

const allowedEvents = [UIEvent.ON_CLICK, UIEvent.ON_CHANGE];

export class YMLInputView extends YMLBase {
    constructor(props) {
        super(props);
        const { obj } = this.props;
        this.state = {
            value: obj.value || obj.defaultValue,
            showPassword: false,
        };
        this.assignEvents = EventsHook(props, allowedEvents);
        this.onChange = this.onChange.bind(this);
        this.doShowPasswordButtonClick = this.doShowPasswordButtonClick.bind(
            this
        );
        this.onBlur = this.onBlur.bind(this);
    }
    componentWillReceiveProps(props) {
        const { obj } = props;
        if (obj.value !== this.state.value) {
            this.setState ({
                value: obj.value || obj.defaultValue,
            });
        }
    }
    doShowPasswordButtonClick() {
        this.setState({ showPassword: !this.state.showPassword });
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
    onChange(e) {
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        const { keyPath, obj } = this.props;
        let defaultProps;
        switch (obj.type.toUpperCase()) {
            case InputType.TEXT:
                defaultProps = {
                    type: 'text',
                    id: 'text-input' + keyPath,
                    name: 'text-input' + keyPath,
                    tooltip: 'Please enter text',
                };
                break;
            case InputType.TEXTAREA:
                defaultProps = {
                    type: 'text',
                    id: 'textarea-input' + keyPath,
                    name: 'textarea-input' + keyPath,
                    tooltip: 'Please enter description',
                    rows: 9,
                };
                break;
            case InputType.NUMBER:
                defaultProps = {
                    type: 'number',
                    id: 'number-input' + keyPath,
                    name: 'number-input' + keyPath,
                    tooltip: 'Please enter number',
                };

                break;
            case InputType.DATE:
                defaultProps = {
                    type: 'date',
                    id: 'date-input' + keyPath,
                    name: 'date-input' + keyPath,
                    tooltip: 'Please enter date',
                };

                break;
            case InputType.DATETIME:
                defaultProps = {
                    type: 'datetime',
                    id: 'datetime-input' + keyPath,
                    name: 'datetime-input' + keyPath,
                    tooltip: 'Please enter date time',
                };

                break;
            case InputType.TIME:
                defaultProps = {
                    type: 'time',
                    id: 'time-input' + keyPath,
                    name: 'time-input' + keyPath,
                    tooltip: 'Please enter time',
                };

                break;
            case InputType.FILE:
                defaultProps = {
                    type: 'file',
                    id: 'file-input' + keyPath,
                    name: 'file-input' + keyPath,
                    tooltip: 'Please choose file',
                };
                break;
            case InputType.PASSWORD:
                const fieldType = this.state.showPassword ? 'text' : 'password';
                defaultProps = {
                    type: fieldType,
                    id: 'nf-password' + keyPath,
                    name: 'nf-password' + keyPath,
                    placeholder: 'Enter Password..',
                    autoComplete: 'current-password',
                    tooltip: 'Please enter your password',
                };

                break;
            case InputType.EMAIL:
                defaultProps = {
                    type: 'email',
                    id: 'nf-email',
                    name: 'nf-email',
                    placeholder: 'Enter Email..',
                    autoComplete: 'email',
                    tooltip: 'Please enter your email',
                };

                break;

            default:
                return null;
        }
        const mergedProps = {
            ...defaultProps,
            ...PropsFilter({ obj }, allowedProps),
            value: this.state.value || '',
        };
        if (obj.type.toUpperCase() === InputType.FILE) {
            delete mergedProps.value;
        }

        return (
            <FormGroup>
                <Label htmlFor={mergedProps.id}>{obj.label}</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        {obj.prepend && <YMLInputGroupView obj={obj.prepend} />}
                        {obj.showButton && <Button
                            color={
                                this.state.showPassword ? 'primary' : 'secondary'
                            }
                            onClick={this.doShowPasswordButtonClick}
                        >
                            <i className="icon-eye" />
                        </Button>}
                    </InputGroupAddon>
                    <Input
                        {...mergedProps}
                        {...this.assignEvents}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                    />
                    <InputGroupAddon addonType="append">
                        {obj.append && <YMLInputGroupView obj={obj.append} />}
                    </InputGroupAddon>
                </InputGroup>
                {mergedProps.tooltip && <FormText className="help-block">
                    {mergedProps.tooltip}
                </FormText>}
            </FormGroup>
        );
    }
}
