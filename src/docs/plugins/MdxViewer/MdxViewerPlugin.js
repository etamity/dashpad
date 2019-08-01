import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import SideMenus, { SubRoutes } from './Menus/SideMenus';
import { MDXProvider } from '@mdx-js/react';
import { YMLBuilder } from 'builder/YMLBuilder';
import yaml from 'js-yaml';
import AutoRouter from 'libs/AutoRouter.js';
import Prism from 'prismjs';

const components = {
    wrapper: (props) => {
        const { children } = props;
        return children.map((child, index) => {
            const { mdxType } = child.props;
            if (mdxType === 'pre') {
                const { mdxType, className, ui, children } = child.props.children.props;
    
                let schema;
                try {
                    schema = yaml.safeLoad(children);
                    console.log(schema);
                } catch (error) {
                    console.error(error);
                }
                if (mdxType === 'code' && ['language-yml', 'language-yaml'].includes(className) && ui ) {
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
            SubRoutes,
            name: 'Documentation',
            route
        };
    }
    componentDidMount() {
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
