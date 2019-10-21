import React, { Component } from 'react';
import { Remote } from 'common/libs/Remote';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Label,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { JsonEditor as Editor } from 'jsoneditor-react';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import 'jsoneditor-react/es/editor.min.css';

const { Config } = Remote();
export class SettingsView extends Component {
    static Config() {
        return {
            name: 'Settings',
        };
    }
    constructor(props) {
        super(props);

        this.state = {
            settings: Config.value().settings,
        };
        this.doSaveAction = this.doSaveAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    doSaveAction() {
        Config.set('settings', this.state.settings);
        toast.success('[INFO] Settings updated!');
    }
    handleChange(value) {
        this.setState({ settings: value });
    }
    render() {
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
                        <Editor
                            value={this.state.settings}
                            ace={ace}
                            name="Settings"
                            onChange={this.handleChange}
                            theme="ace/theme/jsoneditor"
                            history={true}
                        />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}
