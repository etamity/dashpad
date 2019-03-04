import React, { Component } from 'react';
import {
    FormGroup,
    InputGroupAddon,
    InputGroup,
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Label,
    CardFooter,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import TabView from 'components/TabView/TabView';
import Native from 'libs/Native';
import { toast } from 'react-toastify';
import _ from 'lodash';
import immutable from 'object-path-immutable';

const { Config } = Native();
export class SettingsView extends Component {
    static Config() {
        return {
            name: 'Settings'
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            settings: Config.value().settings,
            showPassword: false,
            tooltipOpen: false,
        };
        this.doSaveAction = this.doSaveAction.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
        this.doShowPasswordButtonClick = this.doShowPasswordButtonClick.bind(
            this
        );
        this.renderField = this.renderField.bind(this);
        this.renderTabContent = this.renderTabContent.bind(this);
    }

    doShowPasswordButtonClick() {
        this.setState({ showPassword: !this.state.showPassword });
    }
    updateConfig(keyPath, value) {
        const akeyPath = keyPath.substring(1, keyPath.length);
        let settings = immutable(this.state.settings)
            .set(akeyPath, value)
            .value();
        this.setState({ settings });
    }
    doSaveAction() {
        Config.set('settings', this.state.settings);
        toast.success('[INFO] Settings updated!');
    }
    renderField(keyPath, title, value) {
        const keyPathName = `${keyPath}.${title}`.toLowerCase();
        let inputType = 'text';
        if (_.isString(value)) {
            switch (title.toLowerCase()) {
                case 'password':
                    inputType = 'password';
                    break;
                case 'email':
                    inputType = 'email';
                    break;
                case 'color':
                    inputType = 'color';
                    break;
                default:
                    inputType = 'text';
            }
        } else if (_.isNumber(value)) {
            inputType = 'number';
        } else if (_.isDate(value)) {
            inputType = 'date';
        } else if (_.isBoolean(value)) {
            inputType = 'boolean';
        }
        const defaultInput = (
            <Input
                type={inputType}
                value={value}
                onChange={e => this.updateConfig(keyPathName, e.target.value)}
            />
        );
        const passwordInput = (
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Button
                        color={
                            this.state.showPassword ? 'primary' : 'secondary'
                        }
                        onClick={this.doShowPasswordButtonClick}
                    >
                        <i className="icon-eye" />
                    </Button>
                </InputGroupAddon>
                <Input
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={e =>
                        this.updateConfig(keyPathName, e.target.value)
                    }
                />
            </InputGroup>
        );

        const booleanInput = (
            <InputGroup>
                <AppSwitch
                    name={keyPathName}
                    checked={Boolean(value)}
                    onChange={e =>
                        this.updateConfig(keyPathName, Boolean(e.target.value))
                    }
                    label
                    color={'primary'}
                />
                <InputGroupAddon className="ml-2" addonType="append">
                    <Label
                        htmlFor={keyPathName}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {title}{' '}
                    </Label>
                </InputGroupAddon>
            </InputGroup>
        );

        const inputView = () => {
            switch (inputType) {
                case 'password':
                    return passwordInput;
                case 'boolean':
                    return booleanInput;
                default:
                    return defaultInput;
            }
        };
        return (
            <FormGroup key={`field-${keyPathName}`} row>
                <Col md="3">
                    <Label style={{ textTransform: 'capitalize' }}>
                        <b>{title}</b>
                    </Label>
                </Col>
                <Col xs="12" md="9">
                    {inputView()}
                </Col>
            </FormGroup>
        );
    }

    renderFromGroup(keyPath, tab, tabs) {
        return (
            <Card key={keyPath}>
                <CardHeader>
                    <strong style={{ textTransform: 'capitalize' }}>
                        {tab}
                    </strong>
                </CardHeader>
                <CardBody>
                    {Object.keys(tabs)
                        .filter(key => !_.isObject(tabs[key]))
                        .map(field =>
                            this.renderField(keyPath, field, tabs[field])
                        )}
                </CardBody>
            </Card>
        );
    }

    renderTabContent(keyPath, key, tabs) {
        const keyPathName = `${keyPath}.${key}`.toLowerCase();
        return Object.keys(tabs).map(tab => {
            const fieldGroup = tabs[tab];
            let inputFieldGroup = null;
            if (_.isObject(fieldGroup)) {
                const subKeyPath = `${keyPathName}.${tab}`.toLowerCase();
                inputFieldGroup = this.renderFromGroup(
                    subKeyPath,
                    tab,
                    fieldGroup
                );
            } else {
                inputFieldGroup =
                    !_.isObject(fieldGroup) &&
                    this.renderField(keyPathName, tab, fieldGroup);
            }

            return inputFieldGroup;
        });
    }
    render() {
        const settings = this.state.settings;
        let tabsView = {};
        settings &&
            Object.keys(settings).forEach(key => {
                const tabs = settings[key];
                let tabContent = null;
                if (_.isObject(tabs)) {
                    tabContent = this.renderTabContent('', key, tabs);
                }
                tabsView[key] = tabContent;
            });
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col
                                md="2"
                                className="d-flex justify-content-start align-items-center"
                            />
                            <Col className="d-flex justify-content-center align-items-center">
                                <Label>
                                    {' '}
                                    <b>Settings</b>{' '}
                                </Label>
                            </Col>
                            <Col
                                md="2"
                                className="d-flex justify-content-end align-items-center"
                            >
                                <Button
                                    color="success"
                                    onClick={this.doSaveAction}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <TabView tabs={tabsView} />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}
