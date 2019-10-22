import React, { Component } from 'react';
import { Container, Card, CardBody, Col, Row } from 'reactstrap';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import theme from 'prism-react-renderer/themes/vsDark';

const code = `class Counter extends React.Component {
    constructor() {
        super()
        this.state = { count: 0 }
    }
    
    componentDidMount() {
        this.interval = setInterval(() => {
        this.setState(state => ({ count: state.count + 1 }))
        }, 1000)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    
    render() {
        return (
        <center>
            <h3>
            {this.state.count}
            </h3>
        </center>
        )
    }
}`;
export default class JsxBuilderView extends Component {
    static Config() {
        return {
            name: 'JsxBuilder',
            TopMenus: [
                {
                    name: 'Play Ground',
                    url: '/jsxbuilder',
                },
            ],
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            code
        };
    }
    render() {
        return (
            <Container fluid>
                <Card>
                    <CardBody>
                        <LiveProvider code={this.state.code} theme={theme}>
                            <LiveError />
                            <Row>
                                <Col>
                                    <LiveEditor
                                        style={{
                                            height: '350px',
                                            fontFamily: '"Fira code", "Fira Mono", monospace',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            overflow: 'auto'
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <LivePreview />
                                </Col>
                            </Row>
                        </LiveProvider>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
