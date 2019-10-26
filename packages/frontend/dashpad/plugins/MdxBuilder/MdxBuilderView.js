import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import Prism from 'prismjs';
import MDX from './mdx';
import componentsLibs from './runtimeLibs/components';
import scopes from './runtimeLibs/scopes';
import allowedImports from './runtimeLibs/allowedImports';
import { Remote } from 'common/libs/Remote';
import ErrorRenderer from 'common/components/Error';

const { ContentHelper } = Remote();

const MDXContent = ({ filePath }) => {
    if (!filePath) {
        return <div></div>;
    }

    let mdx;
    try {
        mdx = ContentHelper.loadFile(filePath);
    } catch (error) {
        return <ErrorRenderer>{error}</ErrorRenderer>;
    }

    return (
        <MDX
            components={componentsLibs}
            scope={scopes}
            allowedImports={allowedImports}
            onError={error => console.log(error)}
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
        this.state = {
            MdxContent: '',
        };
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
