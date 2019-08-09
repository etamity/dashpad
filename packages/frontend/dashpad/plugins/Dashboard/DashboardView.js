import React, { Component } from 'react';
import { Container, Card, CardBody, CardHeader } from 'reactstrap';
import { renderRoutes } from 'react-router-config';
import * as Pages from './pages';
import SideMenus from './config/SideMenus';
import TopMenus from './config/TopMenus';
import { GithubListView } from './components/GithubListView';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { Dashpad } from 'common/store';

export default class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.renderDashboard = this.renderDashboard.bind(this);
        this.doGithubAction = this.doGithubAction.bind(this);
        this.state = {
            searchWords: '',
            page: 0,
            plugins: [],
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
        if (Github) {
            const searchWords = this.state.searchWords;
            const keyword = `"${searchWords}"+topic:Dashpad`;
            Github.search
                .repos({ q: keyword, per_page: 50, page:this.state.page, sort: 'stars' })
                .then(res => {
                    this.setState({ plugins: res.data.items });
                });
        }
    }

    renderDashboard() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>IP: {this.props.ip}</CardHeader>
                    <CardBody>
                        <InputGroup>
                            <Input
                                type="text"
                                id="search-group"
                                name="search-group"
                                placeholder="Search plugins ..."
                                onChange={e => {
                                    this.setState({
                                        searchWords: e.target.value,
                                    });
                                }}
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
        const { subRoutes } = this.props;
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
