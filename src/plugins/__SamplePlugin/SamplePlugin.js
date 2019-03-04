import React, { Component } from 'react';
import { Container } from 'reactstrap';
import TopRightIcons from './Menus/TopRightIcons'
import TopMenus from './Menus/TopMenus'
import SideMenus from './Menus/SideMenus'
export class SamplePlugin extends Component {

    static Config(){
        return {
            SideMenus,
            TopRightIcons,
            SubRoutes: [],
            TopMenus,
            name: 'Sample Plugin',
        };
    }
    render() {
        return <Container className="animated mw-100 fadeIn">SamplePlugin Plugin</Container>
    }
}
