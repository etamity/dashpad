import React, { Component } from 'react';
import { MDXProvider } from '@mdx-js/react';
import yaml from 'js-yaml';
import { YMLBuilder } from 'common/builder/YMLBuilder';
import Prism from 'prismjs';
import Loadable from 'react-loadable';
import Document from '../../../documents/markdowns/0.documents/0.index.mdx'
const components = {
    wrapper: props => {
        const { children } = props;
        return children.map((child, index) => {
            const { mdxType } = child.props;
            if (mdxType === 'pre') {
                const {
                    mdxType,
                    className,
                    ui,
                    children,
                } = child.props.children.props;
                let schema;
                try {
                    schema = yaml.safeLoad(children);
                } catch (error) {
                    console.error(error);
                }
                if (
                    mdxType === 'code' &&
                    ['language-yml', 'language-yaml'].includes(className) &&
                    ui
                ) {
                    return (
                        <YMLBuilder
                            key={`uicontainer-${index}`}
                            schema={schema || {}}
                        />
                    );
                }
            }
            return child;
        });
    },
};

const loading = () => (
    <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

export default class MdxBuilder extends Component {
    static Config() {
        return {
            name: 'MDXUIBuilder',
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
        const MdxFileView = Loadable({
            loader: () => import('/Users/tmi290/Documents/dashpad/packages/etamity/dashpad-tutorial/_dash/mdxview.1.mdx'),
            loading,
        });
        return <MDXProvider components={components}><MdxFileView /></MDXProvider>;
    }
}
