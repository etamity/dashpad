import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import Prism from 'prismjs';
import MDX from './mdx';
import componentsLibs from './runtimeLibs/components';
import scopes from './runtimeLibs/scopes';
import allowedImports from './runtimeLibs/allowedImports';
import { Remote } from 'common/libs/Remote';

const { ContentHelper } = Remote();

const MDXContent = ({ filePath }) => {
    if (!filePath) {
        return <div></div>;
    }
    const mdx = ContentHelper.loadFile(filePath) + `/n${(new Date()).getMilliseconds()}`;
    return (
        <MDX
            components={componentsLibs}
            scope={scopes}
            allowedImports={allowedImports}
            resolvePath={filePath.substring(0, filePath.lastIndexOf('/'))}
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
