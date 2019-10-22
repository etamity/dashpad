import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import Prism from 'prismjs';
import { Remote } from 'common/libs/Remote';
import LivePreview from './LivePreview';
import LiveProvider from './LiveProvider';

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
        const content = filePath && ContentHelper.loadMdxFile(filePath);
        return (
            <Container fluid>
                <Card>
                    <CardBody dangerouslySetInnerHTML={{__html: content}}>
                        {/* <LiveProvider code={content} noInline={false}>
                            <LivePreview />
                        </LiveProvider> */}
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
