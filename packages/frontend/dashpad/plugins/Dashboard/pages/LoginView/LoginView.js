import React, { Component } from 'react';
import { Button, Row, FormGroup, Col } from 'reactstrap';
import CoverImg from 'common/assets/dashpad-cover.png';
import { Remote } from 'common/libs/Remote';
const { ContentLoader } = Remote();

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEnterprise: false,
        };
        this.doGithubLogin = this.doGithubLogin.bind(this);
    }

    doGithubLogin() {
        const domain = 'https://github.com';
        const endpoint = 'https://api.github.com';
        ContentLoader.githubLogin(domain,endpoint);
    }
    render() {
        if (this.props.isLogined) {
            this.props.history.push('/dashboard/#');
        }
        return (
            <div className="mt-5">
                <FormGroup className="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <img
                                src={CoverImg}
                                className="rounded mb-3"
                                alt="Responsive"
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup className="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <Button
                                onClick={this.doGithubLogin}
                                size="lg"
                                className={'btn-github btn-brand mr-3 mb-5'}
                            >
                                <i className={'fa fa-github'} />
                                <span className="d-none d-md-inline">
                                    Login With Github
                                </span>
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </div>
        );
    }
}
