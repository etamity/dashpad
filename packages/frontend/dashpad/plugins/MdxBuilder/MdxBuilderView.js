import React, { Component } from 'react';
import { Container, Card, CardBody, Alert } from 'reactstrap';
import Prism from 'prismjs';
import MDX from './mdx';
import componentsLibs from './runtimeLibs/components';
import scopes from './runtimeLibs/scopes';
import allowedImports from './runtimeLibs/allowedImports';
import { Remote } from 'common/libs/Remote';

const { ContentHelper } = Remote();

const MDXContent = ({ filePath }) => {
    if (!filePath) {
        return <Alert className="text-center">No File loaded!</Alert>;
    }
    const mdx =
        ContentHelper.loadFile(filePath) +
        `\n\n<!-- ${new Date().getMilliseconds()} -->`;
    return (
        <MDX
            components={componentsLibs}
            scope={scopes}
            allowedImports={allowedImports}
            modulePath={filePath}
        >
            {mdx}
        </MDX>
    );
};

export default class MdxBuilder extends Component {
    static Config() {
        return {
            name: 'MDXUIBuilder',
        };
    }
    constructor() {
        super();
    }
    componentDidMount() {
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }
    render() {
        const { filePath } = this.props.packageInfo || {};
        return (
            <Container className="animated fadeIn" fluid>
                <Card>
                    <CardBody>
                        <MDXContent filePath={filePath} />
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
