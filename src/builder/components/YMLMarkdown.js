import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';

class Markdown extends Component {
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
export class YMLMarkdownView extends Component {
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
