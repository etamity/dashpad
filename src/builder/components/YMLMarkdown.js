import React from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import { YMLBase } from './YMLBase';

class Markdown extends YMLBase {
    componentDidMount() {
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    render() {
        return <ReactMarkdown source={this.props.source} escapeHtml={false} />;
    }
}
export class YMLMarkdownView extends YMLBase {
    render() {
        const { keyPath, obj } = this.props;
        return (
            <Markdown
                key={keyPath}
                source={obj.content || ''}
                escapeHtml={false}
            />
        );
    }
}
