import React, { Component } from 'react';
import {
    Container,
    Card,
    CardBody,
} from 'reactstrap';
import { YMLMarkdownView } from 'builder/components/YMLMarkdown';
import { renderRoutes } from 'react-router-config';
import * as Pages from './pages';
import SideMenus from './config/SideMenus';
import mainDashboardMarkdown from 'docs/index.md';

export default class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.renderDashboard = this.renderDashboard.bind(this);
        this.state = {
            markdown: null,
        };
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
    renderDashboard() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <YMLMarkdownView
                            obj={{ content: this.state.markdown }}
                            escapeHtml={false}
                        />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }

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
