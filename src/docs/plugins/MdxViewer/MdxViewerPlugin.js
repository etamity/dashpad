import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SideMenus from './Menus/SideMenus'
export class MdxViewerPlugin extends Component {

    static Config(){
        return {
            SideMenus,
            SubRoutes: [],
            name: 'Sample Plugin',
        };
    }
    render() {
        return <Container className="animated mw-100 fadeIn">SamplePlugin Plugin</Container>
    }
}
