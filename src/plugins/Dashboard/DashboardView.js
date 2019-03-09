import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { renderRoutes } from 'react-router-config';
import * as Pages from './pages';
import SideMenus from './config/SideMenus';
import TopMenus from './config/TopMenus';
import { GithubListView } from './components/GithubListView';
import {
    Button,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import { Dashpad } from 'store';

export default class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.renderDashboard = this.renderDashboard.bind(this);
        this.doGithubAction = this.doGithubAction.bind(this);
        this.state = {
            plugins: [
            ],
        };
    }
    componentDidMount() {
        this.doGithubAction();
    }
    static Config() {
        return {
            SideMenus,
            SubRoutes: Pages,
            TopMenus,
        };
    }

    doGithubAction(e) {
        const { Github } = Dashpad.platform;
        const keyword = (e && e.target && e.target.value) || 'topic:dashpad';
        Github.search
            .repos({ q: keyword, per_page: 10, sort: 'stars' })
            .then(res => {
                console.log(res.data.items);
                this.setState({ plugins: res.data.items });
            });
    }

    renderDashboard() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <InputGroup>
                            <Input
                                type="text"
                                id="search-group"
                                name="search-group"
                                placeholder="Search plugins ..."
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    type="button"
                                    color="primary"
                                    onClick={this.doGithubAction}
                                >
                                    <i className="fa fa-search" /> Search
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </CardBody>
                    <hr />
                    <CardBody>
                        <GithubListView items={this.state.plugins} />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }

    onLoad;

    render() {
        const { route, location } = this.props;
        const subRoutes =
            route.routes &&
            route.routes.filter(route => {
                const pathArr = route.path.split('/');
                return location.pathname.includes(pathArr[pathArr.length - 1]);
            });
        const renderView =
            subRoutes.length > 0
                ? renderRoutes(subRoutes)
                : this.renderDashboard();
        return (
            <React.Fragment>
                <Container>{renderView}</Container>
            </React.Fragment>
        );
    }
}
