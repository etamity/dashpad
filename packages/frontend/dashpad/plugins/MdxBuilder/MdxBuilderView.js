import React, { Component } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import yaml from 'js-yaml';
import { YMLBuilder } from 'common/builder/YMLBuilder';
import Prism from 'prismjs';
import { Remote } from 'common/libs/Remote';
// import MDX from './tansfrom'
// import Layout from './Layout';

const { ContentHelper } = Remote();
const components = {
    // wrapper: props => {
    //     const { children } = props;
    //     return children.map((child, index) => {
    //         const { mdxType } = child.props;
    //         if (mdxType === 'pre') {
    //             const {
    //                 mdxType,
    //                 className,
    //                 ui,
    //                 children,
    //             } = child.props.children.props;
    //             let schema;
    //             try {
    //                 schema = yaml.safeLoad(children);
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //             if (
    //                 mdxType === 'code' &&
    //                 ['language-yml', 'language-yaml'].includes(className) &&
    //                 ui
    //             ) {
    //                 return (
    //                     <YMLBuilder
    //                         key={`uicontainer-${index}`}
    //                         schema={schema || {}}
    //                     />
    //                 );
    //             }
    //         }
    //         return child;
    //     });
    // },
};

const scope = {

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
        const content = filePath && ContentHelper.loadMdxFile(filePath);
        console.log(content);
        return (
            <Container fluid>
                <Card>
                    <CardBody dangerouslySetInnerHTML={{__html: content}}>
                        {/* <MDX
                            scope={scope}
                            onError={error => console.log(error)}
                        >
                            {content}
                        </MDX> */}

                        {/* <Content /> */}
                    </CardBody>
                </Card>
            </Container>
        );
    }
}
