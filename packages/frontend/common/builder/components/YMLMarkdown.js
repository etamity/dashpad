import React from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import { YMLBase } from './YMLBase';
import { PropsFilter } from './utils';

const allowedProps = [
    'escapeHtml',
    'skipHtml',
    'sourcePos',
    'rawSourcePos',
    'includeNodeIndex',
    'allowedTypes',
    'disallowedTypes',
    'unwrapDisallowed',
    'allowNode',
    'allowedTypes',
    'linkTarget',
    'transformLinkUri',
    'transformImageUri',
    'renderers',
    'data-',
];

class Markdown extends YMLBase {
    componentDidMount() {
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    render() {
        return <ReactMarkdown source={this.props.content} {...this.props} />;
    }
}
export class YMLMarkdownView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        const assignProps = PropsFilter(this.props, allowedProps);
        return (
            <Markdown key={keyPath} content={obj.content} {...assignProps} />
        );
    }
}
