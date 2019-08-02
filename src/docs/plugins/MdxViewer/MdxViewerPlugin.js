import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import SideMenus, { SubRoutes } from './Menus/SideMenus';
import { MDXProvider } from '@mdx-js/react';
import { YMLBuilder } from 'builder/YMLBuilder';
import yaml from 'js-yaml';
import AutoRouter from 'libs/AutoRouter.js';
import Prism from 'prismjs';
import VM from 'libs/VM';

const components = {
    wrapper: (props) => {
        const { children } = props;
        return children.map((child, index) => {
            const { mdxType } = child.props;
            if (mdxType === 'pre') {
                const { mdxType, className, ui, children } = child.props.children.props;
                if (mdxType === 'code' && ['language-yml', 'language-yaml'].includes(className) && ui ) {
                    let schema;
                    try {
                        schema = yaml.safeLoad(children);
                    } catch (error) {
                        console.error(error);
                    }
                    return <YMLBuilder key={`uicontainer-${index}`} schema={schema || {}}></YMLBuilder>
                }
            }
            return child;
        });
    },
};



export class MdxViewerPlugin extends Component {
    static Config() {
        const route = 'docs';
        return {
            SideMenus,
            TopRightButtons: {
                url: 'https://github.com/etamity/dashpad',
                variant: 'danger',
                icon: 'fa fa-github fa-2x',
            },
            SubRoutes,
            name: 'Documentation',
            route
        };
    }
    componentDidMount() {
        VM.buildVmScope('"";\n');
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    render() {
        return (
            <Container fluid>
                <Card>
                    <CardBody>
                        <MDXProvider components={components}>
                            <AutoRouter
                                routes={this.props.route.routes}
                                {...this.props}
                            />
                        </MDXProvider>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
