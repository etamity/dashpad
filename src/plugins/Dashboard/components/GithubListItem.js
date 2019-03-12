import React, { Component } from 'react';
import { ListGroupItem, Row, Col, Button, Progress } from 'reactstrap';
import moment from 'moment';
import { shell } from 'electron';
import Native from 'libs/Native';

const { ModuleHelper } = Native();

export class GithubListItem extends Component {
    constructor() {
        super();
        this.doInstall = this.doInstall.bind(this);
        this.doUnInstall = this.doUnInstall.bind(this);
        this.state = {
            progressing: false,
        };
    }
    doInstall(content) {
        this.setState({ progressing: true });
        ModuleHelper.install(content.full_name, content.clone_url).then(() => {
            this.setState({ progressing: false });
        });
    }
    doUnInstall(content) {
        this.setState({ progressing: true });
        ModuleHelper.uninstall(content.full_name).then(() => {
            this.setState({ progressing: false });
        });
    }
    render() {
        const { content } = this.props;
        const updated_at = moment(content.updated_at);
        return (
            <Row>
                <Col>
                    <ListGroupItem>
                        <span className="d-flex justify-content-between">
                            <h3
                                className="text-primary cursor-pointer"
                                onClick={() => {
                                    content.clone_url &&
                                        shell.openExternal(content.clone_url);
                                }}
                            >
                                {content.full_name}
                            </h3>
                            <span className="p-2">
                                <i className="fa fa-star fa-sm" />{' '}
                                {content.stargazers_count}
                            </span>
                        </span>
                        <p>{content.description}</p>
                        <p className="text-right">
                            <b>Updated</b>: {updated_at.fromNow()}
                        </p>
                        {this.state.progressing && (
                            <Progress animated max="1" value="1" />
                        )}
                    </ListGroupItem>
                </Col>
                <Col md="2" className="align-self-center">
                    <Button
                        color="success"
                        block
                        onClick={() => {
                            this.doInstall(content);
                        }}
                    >
                        {' '}
                        Install{' '}
                    </Button>
                    <Button
                        color="danger"
                        block
                        onClick={() => {
                            this.doUnInstall(content);
                        }}
                    >
                        {' '}
                        Uninstall{' '}
                    </Button>
                </Col>
            </Row>
        );
    }
}
