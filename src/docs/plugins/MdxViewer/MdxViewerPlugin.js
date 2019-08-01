import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import SideMenus from './Menus/SideMenus';
import Document, { metadata } from '../../markdowns/index.mdx';
import { MDXProvider } from '@mdx-js/react';
import { YMLBuilder } from 'builder/YMLBuilder';
import yaml from 'js-yaml';

const components = {
    wrapper: (props) => {
        const { children } = props;
        return children.map((child, index) => {
            console.log(child);
            const { mdxType } = child.props;
            if (mdxType === 'pre') {
                const { mdxType, className, ui, children } = child.props.children.props;
                if (mdxType === 'code' && ['language-yml', 'language-yaml'].includes(className) && ui ) {
                    return <YMLBuilder key={`uicontainer-${index}`} schema={yaml.safeLoad(children)}></YMLBuilder>
                }
            }
            return child;
        });
    },
};

export class MdxViewerPlugin extends Component {
    static Config() {
        return {
            SideMenus,
            SubRoutes: [],
            name: 'Sample Plugin',
        };
    }
    render() {
        return (
            <Container fluid>
                <Card>
                    <CardBody>
                        <MDXProvider components={components}>
                            <Document />
                        </MDXProvider>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
