import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import Prism from 'prismjs';
import { Remote } from 'common/libs/Remote';
import MDX from '@mdx-js/runtime';
import componentsLibs from './components';
import scopes from './scopes';
const { ContentHelper } = Remote();

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

        const MDXContent = () => {
            const mdx = filePath && ContentHelper.loadFile(filePath);
            return (
                <MDX
                    components={componentsLibs}
                    scope={scopes}
                    onError={error => console.log(error)}
                >
                    {mdx}
                </MDX>
            );
        };
        return (
            <Container className="animated fadeIn" fluid>
                <Card>
                    <CardBody>
                        <MDXContent />
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
