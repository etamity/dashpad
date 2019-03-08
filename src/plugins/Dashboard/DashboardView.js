import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { renderRoutes } from 'react-router-config';
import * as Pages from './pages';
import SideMenus from './config/SideMenus';
import mainDashboardMarkdown from 'docs/index.md';
import {GithubListView} from './components/GithubListView'
import {
    Button,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
} from 'reactstrap';

import { Dashpad } from 'store';

export default class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.renderDashboard = this.renderDashboard.bind(this);
        this.doGithubAction = this.doGithubAction.bind(this);
        this.mapItems = this.mapItems.bind(this);
        this.state = {
            plugins: [{
                title: 'asdasd',
                description: 'asdasdad',
                stars: 5,
                owner: {
                    avatar_url: '',
                    login: 'etamity'
                }
            }],
        };
    }
    componentDidMount() {
        //this.doGithubAction();
    }
    static Config() {
        return {
            SideMenus,
            SubRoutes: Pages,
        };
    }
    componentWillMount() {
        fetch(mainDashboardMarkdown)
            .then(response => response.text())
            .then(text => {
                this.setState({ markdown: text });
            });
    }
    mapItems(items) {
        return items.map(item => {
            return {
                title: item.full_name,
                description: item.description,
                link: item.clone_url,
                owner: item.owner,
                stars: item.stargazers_count,
                raw: item
            };
        })
    }
    doGithubAction(e) {
        const { Github } = Dashpad.platform;
        const keyword = (e && e.target && e.target.value) || 'topic:dashpad'
        Github.search
        .repos({ q: keyword, per_page: 10, sort: 'stars'})
        .then(res => {
            console.log(res.data);

        });
    }

    renderDashboard() {
        return (
            <React.Fragment>
                <Card>
                <CardBody>
                        <FormGroup>
                            <InputGroup>
                                <Input
                                    type="text"
                                    id="search-group"
                                    name="search-group"
                                    placeholder="Search plugins ..."
                                />
                                <InputGroupAddon addonType="append">
                                    <Button type="button" color="primary" onClick={this.doGithubAction}>
                                        <i className="fa fa-search" /> Search
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </CardBody>
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
