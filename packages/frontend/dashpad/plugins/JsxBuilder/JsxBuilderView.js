import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { Remote } from 'common/libs/Remote';
import JsxParser from 'react-jsx-parser';


const { ContentHelper } = Remote();

export default class JsxBuilderView extends Component {
    static Config() {
        return {
            name: 'JsxBuilder',
        };
    }

    componentDidMount() {
        const { filePath } = this.props.packageInfo || {};
        fetch(filePath).then(res=> res.text()).then(data => this.setState({ jsx: data }));
    }

    render() {
        const { filePath } = this.props.packageInfo || {};
        const content = filePath && ContentHelper.loadFile(filePath);
        return (
            <Container fluid>
                <Card>
                    <CardBody>
                        <JsxParser jsx={content} />
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
